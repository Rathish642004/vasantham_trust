-- Seed some initial gallery images
INSERT INTO public.gallery (title, description, image_url, category) VALUES
('Food Distribution Drive', 'Monthly food distribution to elderly residents in rural Tamil Nadu', '/placeholder.svg?height=400&width=600', 'food_distribution'),
('Medical Camp', 'Free medical checkup and medicine distribution camp', '/placeholder.svg?height=400&width=600', 'medical_camp'),
('Educational Support', 'School supplies distribution to underprivileged children', '/placeholder.svg?height=400&width=600', 'education'),
('Elder Care Visit', 'Regular visits to elderly homes providing care and companionship', '/placeholder.svg?height=400&width=600', 'elder_care'),
('Community Gathering', 'Community awareness program on health and hygiene', '/placeholder.svg?height=400&width=600', 'community'),
('Construction Progress', 'Old age home construction site progress', '/placeholder.svg?height=400&width=600', 'construction');

-- Seed initial news post
INSERT INTO public.news (title, content, excerpt, image_url, published) VALUES
('Urgent Appeal: Help Us Build an Old Age Home', 
'We are seeking your generous support to construct a dedicated old age home in rural Tamil Nadu. This facility will provide shelter, care, and dignity to elderly individuals who have nowhere else to go. The estimated cost is ₹50 lakhs, and every contribution brings us closer to making this dream a reality. Your donation will directly impact the lives of senior citizens who deserve a safe and caring environment in their golden years.',
'Support our mission to build a safe haven for elderly citizens in rural Tamil Nadu',
'/placeholder.svg?height=300&width=800',
true);
