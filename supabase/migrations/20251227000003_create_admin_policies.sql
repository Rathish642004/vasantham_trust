-- Update policies to allow authenticated users (admins) to manage content

-- Gallery policies for admins
CREATE POLICY "gallery_insert_auth" ON public.gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "gallery_update_auth" ON public.gallery FOR UPDATE TO authenticated USING (true);
CREATE POLICY "gallery_delete_auth" ON public.gallery FOR DELETE TO authenticated USING (true);

-- News policies for admins
CREATE POLICY "news_select_all_auth" ON public.news FOR SELECT TO authenticated USING (true);
CREATE POLICY "news_insert_auth" ON public.news FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "news_update_auth" ON public.news FOR UPDATE TO authenticated USING (true);
CREATE POLICY "news_delete_auth" ON public.news FOR DELETE TO authenticated USING (true);

-- Contact submissions - admins can view all
CREATE POLICY "contact_select_auth" ON public.contact_submissions FOR SELECT TO authenticated USING (true);

-- Donations - admins can view all
CREATE POLICY "donations_select_auth" ON public.donations FOR SELECT TO authenticated USING (true);
