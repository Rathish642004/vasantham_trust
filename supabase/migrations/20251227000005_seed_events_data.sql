-- Seed some sample events for each activity type

-- Elder Care Events
INSERT INTO public.events (title, description, activity_type, location, event_date) VALUES
('Monthly Elder Care Visit - Vadakku Village', 'Regular health checkup and companionship visit to elderly citizens in Vadakku Village. Distributed medicines and spent quality time with 25 senior citizens.', 'elder_care', 'Vadakku Village, Tamil Nadu', '2024-01-15'),
('Senior Citizens Health Camp', 'Comprehensive health screening camp organized for elderly population. Blood pressure, sugar level checks, and free medicines distributed to 40 participants.', 'elder_care', 'Community Center, Periyakulam', '2024-02-10'),
('Elder Care Welfare Program', 'Distribution of essential items including walking sticks, reading glasses, and health supplements to 30 elderly individuals living alone.', 'elder_care', 'Rural Health Center, Theni', '2024-03-05');

-- Food Distribution Events
INSERT INTO public.events (title, description, activity_type, location, event_date) VALUES
('Monthly Food Distribution Drive', 'Distributed rice, dal, oil, and essential groceries to 150 underprivileged families. Each family received a month''s supply of staples.', 'food_distribution', 'Chinnamanur, Tamil Nadu', '2024-01-20'),
('Festival Special Meal Service', 'Hot meal service organized during Pongal festival. Served traditional meals to over 500 community members including elderly and children.', 'food_distribution', 'Temple Ground, Bodinayakanur', '2024-01-14'),
('Emergency Food Relief', 'Emergency food packet distribution to families affected by recent floods. Provided immediate nutrition support to 200 families in need.', 'food_distribution', 'Multiple Villages, Theni District', '2024-02-25');

-- Education Events
INSERT INTO public.events (title, description, activity_type, location, event_date) VALUES
('School Supplies Distribution', 'New academic year kick-off event. Distributed notebooks, textbooks, school bags, and stationery to 80 underprivileged students.', 'education', 'Government School, Uthamapalayam', '2024-06-05'),
('Scholarship Award Ceremony', 'Merit-based scholarship presentation to 15 high-achieving students from economically disadvantaged backgrounds. Each received ₹5,000 for educational expenses.', 'education', 'Community Hall, Cumbum', '2024-07-20'),
('Computer Literacy Workshop', 'Free computer training workshop for rural students. 25 students learned basic computer skills, internet usage, and digital literacy.', 'education', 'Training Center, Periyakulam', '2024-08-15');

-- Medical Camp Events
INSERT INTO public.events (title, description, activity_type, location, event_date) VALUES
('Free Health Checkup Camp', 'General health screening camp with qualified doctors. Provided free consultation, medicines, and health awareness to 120 patients.', 'medical_camp', 'Primary Health Center, Vadakku', '2024-01-25'),
('Eye Care & Dental Camp', 'Specialized medical camp focusing on eye and dental health. Free eye testing, reading glasses, dental checkups, and treatments provided to 80 patients.', 'medical_camp', 'Community Center, Andipatti', '2024-03-12'),
('Women & Child Health Camp', 'Dedicated health camp for women and children. Pediatric care, women''s health screening, nutrition counseling, and free medicines distributed.', 'medical_camp', 'Anganwadi Center, Chinnamanur', '2024-04-08');
