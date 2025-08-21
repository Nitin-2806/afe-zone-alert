-- Fix RLS issues for location_updates table
ALTER TABLE public.location_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for location_updates
CREATE POLICY "Users can view location updates for their alerts" 
ON public.location_updates 
FOR SELECT 
USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.emergency_alerts 
    WHERE emergency_alerts.id = location_updates.alert_id 
    AND emergency_alerts.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert their own location updates" 
ON public.location_updates 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

-- Fix the function to have proper search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

-- Enable RLS for t1 table (if needed) or we can drop it if unused
DROP TABLE IF EXISTS public.t1;