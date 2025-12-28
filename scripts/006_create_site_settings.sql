-- Create site_settings table to store configurable settings like bank details, contact info
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read settings
CREATE POLICY "Anyone can read site settings"
  ON site_settings FOR SELECT
  USING (true);

-- Authenticated users can update settings
CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true);

-- Authenticated users can insert settings
CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default bank details
INSERT INTO site_settings (key, value) VALUES
  ('bank_details', '{
    "account_name": "Vasantham Charitable Trust",
    "account_number": "44218471148",
    "ifsc_code": "SBIN0064834",
    "bank_name": "State Bank of India",
    "branch": "Silvarpatti Branch",
    "upi_id": "",
    "qr_code_url": ""
  }'::jsonb),
  ('contact_details', '{
    "address": "No. 123, Vasantham Nagar, Near Government Hospital, Dindigul - 624001, Tamil Nadu, India",
    "phone": "+91 73737 07162",
    "email": "info@vasanthamtrust.org",
    "notification_email": "admin@vasanthamtrust.org"
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_site_settings_updated_at();
