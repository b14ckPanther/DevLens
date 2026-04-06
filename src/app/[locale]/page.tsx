import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Pricing from "@/components/sections/Pricing";
import Story from "@/components/sections/Story";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  
  const { data: projects } = await supabase.from('projects').select('*').eq('is_published', true);
  const { data: plans } = await supabase.from('plans').select('*').order('order_index', { ascending: true });
  const { data: settings } = await supabase.from('settings').select('*').single();
  
  const projectsCount = projects?.length || 50;
  const clientsCount = Math.floor((settings?.base_clients_count || 40) + (projectsCount * 0.8));
  const yearsExperience = new Date().getFullYear() - (settings?.started_year || 2023) + 1;

  const stats = { projectsCount, clientsCount, yearsExperience };

  return (
    <main className="relative overflow-x-hidden w-full">
      <Navbar />
      <Hero stats={stats} />
      <WhyUs />
      <Services />
      <Work initialProjects={projects || []} projectsCount={stats.projectsCount} />
      <Pricing initialPlans={plans || []} />
      <Story stats={stats} />
      <Contact />
      <Footer />
    </main>
  );
}
