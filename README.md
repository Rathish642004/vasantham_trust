# Vasantham Charitable Trust Website

A modern, production-ready website for Vasantham Charitable Trust - a DARPAN registered NGO serving underprivileged communities in rural Tamil Nadu.

## Features

- **Public Pages**
  - Home with impact statistics and urgent appeals
  - About Us with mission, vision, and registration details
  - Activities showcasing all programs (Elder Care, Food Distribution, Education, Medical Camps)
  - Photo Gallery with category filters
  - Donation page with multiple giving options
  - Contact form with submissions tracked in database

- **Admin Panel** (Protected with Supabase Auth)
  - Dashboard with overview statistics
  - Gallery management
  - News/updates management
  - Contact message inbox
  - Donation records tracking

- **Technical Stack**
  - Next.js 16 (App Router)
  - React 19
  - Supabase (Database + Authentication)
  - Tailwind CSS v4
  - shadcn/ui components
  - TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase project set up (already connected)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run database migrations:
The SQL scripts in the `/scripts` folder will set up your database tables. Run them from the v0 interface or manually in Supabase.

3. Start development server:
```bash
npm run dev
```

4. Visit `http://localhost:3000`

### Admin Access

1. Create an admin account:
   - Go to your Supabase dashboard > Authentication > Users
   - Create a new user with email/password
   
2. Login:
   - Visit `/auth/login`
   - Use the admin credentials
   - Access admin panel at `/admin`

## Database Schema

- **gallery**: Photo gallery images with categories
- **news**: News posts and announcements
- **contact_submissions**: Contact form submissions
- **donations**: Donation records and tracking

All tables have Row Level Security (RLS) enabled:
- Public read access for gallery and published news
- Public insert for contact forms and donations
- Admin (authenticated) full access to all tables

## Deployment

This site is ready to deploy to Vercel:

1. Push your code to GitHub
2. Import to Vercel
3. Environment variables are already connected via Supabase integration
4. Deploy!

## Customization

### Update Organization Details

- Edit contact information in `components/footer.tsx`
- Update DARPAN ID and registration details in `/about` page
- Modify impact statistics in `app/page.tsx`

### Add Real Images

Replace placeholder images in:
- `/public` directory for static images
- Database gallery table for dynamic photos
- Update image URLs throughout the codebase

### Styling

- Colors are defined in `app/globals.css` using CSS variables
- Modify the color tokens to match your brand
- Font families are set in `app/layout.tsx`

## Support

For questions or support, contact the development team.

## License

© 2025 Vasantham Charitable Trust. All rights reserved.
