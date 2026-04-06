-- Update plans table for Hebrew support and Yearly Pricing
ALTER TABLE public.plans 
ADD COLUMN IF NOT EXISTS name_he TEXT,
ADD COLUMN IF NOT EXISTS description_he TEXT,
ADD COLUMN IF NOT EXISTS features_he JSONB,
ADD COLUMN IF NOT EXISTS price_subscription_yearly NUMERIC;

-- Optional: Rename columns for clarity (keep old ones as aliases or fallbacks if needed)
-- ALTER TABLE public.plans RENAME COLUMN price_subscription TO price_subscription_monthly;
