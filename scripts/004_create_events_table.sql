-- Create events table for activity-based events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  activity_type TEXT NOT NULL, -- elder_care, food_distribution, education, medical_camp
  location TEXT NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create event_photos table to link photos to events
CREATE TABLE IF NOT EXISTS public.event_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on events and event_photos tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_photos ENABLE ROW LEVEL SECURITY;

-- Events policies: Anyone can view
CREATE POLICY "events_select_all" ON public.events FOR SELECT USING (true);

-- Events policies for admins: authenticated users can manage
CREATE POLICY "events_insert_auth" ON public.events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "events_update_auth" ON public.events FOR UPDATE TO authenticated USING (true);
CREATE POLICY "events_delete_auth" ON public.events FOR DELETE TO authenticated USING (true);

-- Event photos policies: Anyone can view
CREATE POLICY "event_photos_select_all" ON public.event_photos FOR SELECT USING (true);

-- Event photos policies for admins: authenticated users can manage
CREATE POLICY "event_photos_insert_auth" ON public.event_photos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "event_photos_update_auth" ON public.event_photos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "event_photos_delete_auth" ON public.event_photos FOR DELETE TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_activity_type ON public.events(activity_type);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_event_photos_event_id ON public.event_photos(event_id);
