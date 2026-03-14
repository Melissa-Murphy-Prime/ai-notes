# Porch & Pine Properties Website - Setup Guide

## Overview
This is a Next.js website for Porch & Pine Properties with:
- Beautiful, organic modern design (Pacific Northwest inspired)
- Property showcase (7 short-term rentals)
- Owner/Renter login system
- Blog/News section (powered by Sanity CMS)
- Contact form with email integration
- Rentec backend integration (placeholder)

## Initial Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.local` and fill in the required values:

```
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token

# Rentec API
NEXT_PUBLIC_RENTEC_API_URL=https://api.rentec.com
RENTEC_API_KEY=your_api_key

# Email (Gmail example)
SMTP_EMAIL=broker@propertybyprime.com
SMTP_PASSWORD=your_app_password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587

# NextAuth
NEXTAUTH_SECRET=generate_with: openssl rand -base64 32
NEXTAUTH_URL=https://porchpineproperties.com
```

### 3. Set Up Sanity CMS

1. Go to [Sanity.io](https://sanity.io) and create a free account
2. Create a new project
3. Note your Project ID and Dataset name
4. In Sanity dashboard, create an API token with read access
5. Add these to your `.env.local`

### 4. Configure Rentec API

Once you have Rentec API credentials:
1. Update `NEXT_PUBLIC_RENTEC_API_URL` and `RENTEC_API_KEY` in `.env.local`
2. Uncomment the actual API calls in `/lib/rentec.ts`
3. Update authentication logic in `/app/api/auth/[...nextauth]/route.ts`

### 5. Email Configuration

For Gmail:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `SMTP_PASSWORD`

### 6. Domain Setup

1. Point PorchPineProperties.com to Vercel:
   - In GoDaddy DNS settings, add Vercel nameservers
   - Or add CNAME record pointing to Vercel
2. In Vercel project settings, add the domain

## Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### Demo Login
- Email: `test@example.com`
- Password: `password`

(Update with real Rentec authentication)

## Deployment to Vercel

1. Push this repo to GitHub
2. Connect repo to Vercel: https://vercel.com/new
3. Add environment variables in Vercel project settings
4. Deploy!

## File Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/      # Authentication
│   │   └── contact/                 # Email form handler
│   ├── about/                        # About page
│   ├── blog/                         # Blog/News
│   ├── contact/                      # Contact form
│   ├── dashboard/                    # Owner/Renter dashboard
│   ├── login/                        # Login page
│   ├── properties/                   # Properties listing
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   └── globals.css                   # Global styles
├── components/
│   ├── Navigation.tsx                # Header navigation
│   └── Footer.tsx                    # Footer
├── lib/
│   ├── sanity.ts                     # Sanity CMS client
│   └── rentec.ts                     # Rentec API client
└── public/
    └── properties/                   # Property images (placeholder)
```

## Next Steps

1. **Add Property Images**: Place images in `/public/properties/` and update image references
2. **Add Team Photos**: Replace team placeholder images in `/app/about/`
3. **Configure Sanity CMS**: Set up content schemas for blog posts
4. **Update About Page**: Fetch team bios from existing propertybyprime.com/about
5. **YouTube Integration**: Add video tour URLs for properties
6. **Real Authentication**: Connect to Rentec API for real login
7. **Additional Pages**: Create individual property detail pages (`/properties/[id]`)

## Troubleshooting

### Email not sending?
- Check SMTP credentials
- Enable "Less secure app access" if using Gmail
- Check spam folder
- Verify sender email in SMTP_EMAIL matches authenticated account

### NextAuth errors?
- Regenerate NEXTAUTH_SECRET
- Ensure NEXTAUTH_URL matches your domain
- Check browser cookies are enabled

### Sanity not connecting?
- Verify Project ID and API token
- Check CORS settings in Sanity dashboard
- Ensure API token has appropriate permissions

## Support Contacts

- Broker: broker@propertybyprime.com
- Manager: melissa@propertybyprime.com
- Guest Services: julie@propertybyprime.com
