"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Supabase URL or Service Role Key is missing in environment variables.");
  }

  return createClient(url, serviceKey);
}

export async function deleteProjectAction(id: number) {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function saveProjectAction(projectData: any) {
  try {
    const supabase = getAdminClient();
    
    // If id exists, it's an update, otherwise it's an insert
    let query = supabase.from("projects");
    if (projectData.id) {
      const { id, ...updateData } = projectData;
      const { error } = await query.update(updateData).eq("id", id);
      if (error) throw error;
    } else {
      const { error } = await query.insert([projectData]);
      if (error) throw error;
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function uploadProjectFileAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const path = formData.get("path") as string;
    
    if (!file || !path) throw new Error("Missing file data");

    const supabase = getAdminClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabase.storage.from("project_assets").upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage.from("project_assets").getPublicUrl(path);
    return { url: publicUrlData.publicUrl };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function toggleProjectPublishAction(id: string, currentStatus: boolean) {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase
      .from("projects")
      .update({ is_published: !currentStatus })
      .eq("id", id);
      
    if (error) throw error;

    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function submitLeadAction(formData: any) {
  try {
    const supabase = getAdminClient(); 
    const { error } = await supabase
      .from("leads")
      .insert([
        {
          client_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_requested: formData.service,
          business_type: formData.businessType,
          notes: formData.notes,
          status: 'pending'
        }
      ]);
      
    if (error) throw error;
    revalidatePath("/admin", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateLeadStatusAction(id: string, status: string) {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);
      
    if (error) throw error;
    revalidatePath("/admin", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteLeadAction(id: string) {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);
      
    if (error) throw error;
    revalidatePath("/admin", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function convertLeadToProjectAction(leadId: string) {
  try {
    const supabase = getAdminClient();
    
    // 1. Get the lead
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();
      
    if (leadError) throw leadError;

    // 2. Map lead to project draft
    const projectData = {
      name_en: lead.client_name,
      description_en: `Project requested by ${lead.client_name}. Service: ${lead.service_requested}. Notes: ${lead.notes || 'No notes.'}`,
      category: lead.service_requested?.toLowerCase().includes('menu') ? 'menus' : 'landing',
      initials: lead.client_name?.substring(0, 2).toUpperCase() || 'NW',
      color: '#00C2FF',
      is_published: false,
    };

    // 3. Insert project
    const { data: project, error: projError } = await supabase
      .from("projects")
      .insert([projectData])
      .select()
      .single();
      
    if (projError) throw projError;

    // 4. Update lead status to 'approved' if not already
    await supabase.from("leads").update({ status: 'approved' }).eq("id", leadId);

    revalidatePath("/admin", "layout");
    return { success: true, projectId: project.id };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function trackEventAction(event: { type: string, metadata?: any }) {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase
      .from("analytics_events")
      .insert([{ 
        event_type: event.type, 
        metadata: event.metadata,
        created_at: new Date().toISOString() 
      }]);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("Tracking error:", err);
    return { error: err.message };
  }
}

export async function getAnalyticsSummaryAction() {
  try {
    const supabase = getAdminClient();
    
    // In a real app, this would be complex SQL aggregations. 
    // Here we'll do simple counts for the demo/dashboard start.
    const { count: totalLeads } = await supabase.from("leads").select("*", { count: 'exact', head: true });
    const { count: totalProjects } = await supabase.from("projects").select("*", { count: 'exact', head: true });
    
    // Example: Plan clicks from events table
    const { data: events } = await supabase
      .from("analytics_events")
      .select("*")
      .eq("event_type", "plan_selection");

    return { 
      totalLeads: totalLeads || 0,
      totalProjects: totalProjects || 0,
      eventStats: events || []
    };
  } catch (err: any) {
    return { error: err.message };
  }
}


export async function updateSettingsAction(data: any) {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase
      .from("settings")
      .upsert({ id: 1, ...data });
    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function savePlanAction(planData: any) {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase
      .from("plans")
      .upsert(planData);
    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deletePlanAction(id: string) {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase
      .from("plans")
      .delete()
      .eq("id", id);
    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}


