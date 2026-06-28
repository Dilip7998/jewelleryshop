# Pooja Jewellers

Production-ready full-stack jewellery storefront with a responsive Next.js frontend, Express API, MongoDB persistence, JWT-protected admin dashboard, WhatsApp enquiries, and Cloudinary image uploads.

## Project Structure

```text
jewellery-shop/
  frontend/  Next.js + Tailwind storefront and admin UI
  backend/   Express + MongoDB + JWT + Cloudinary API
```

## Features

- Luxury homepage with hero imagery, offers, featured products, latest collection slider, testimonials, trust badges, Instagram-style gallery, and newsletter.
- Catalog with category, search, stock, and price filtering.
- Product cards with image, product name, original price, discount percentage, discounted price, stock state, and WhatsApp enquiry.
- Admin dashboard with secure login, product add/edit/delete, multi-image upload, category management, offer management, stock toggle, and customer enquiry review.
- Contact, about, FAQ, privacy policy, and terms pages.
- Floating WhatsApp button on every page using `https://wa.me/<YOUR_PHONE_NUMBER>` and the configured pre-filled message.
- Centralized placeholder business details and Instagram/Facebook/X links.
- Sitemap, robots rules, web manifest, custom 404, security headers, API rate limits, CORS allow-listing, and health checks.

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create local environment files:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Keep real deployment credentials in `backend/.env.production.local` and
`frontend/.env.production.local` when testing a production build locally. These
runtime files are ignored by Git. Never put real credentials in `.env.example`.

After changing production values, copy them to local while retaining local
MongoDB and localhost URLs:

```bash
npm run env:sync-local
```

3. Update the required values:

- `frontend/.env.local`: API URL, website URL, WhatsApp number, public contact details, and social URLs
- `backend/.env`: MongoDB URI, a long random JWT secret, admin email/password, and frontend URL
- Cloudinary fields for admin image upload
- SMTP fields if enquiry email notifications are required

4. Start MongoDB locally or point `MONGODB_URI` to MongoDB Atlas.

5. Start both apps:

```bash
npm run dev
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:5000/api/health`

## Admin Login

On backend startup, the default admin is created from:

```text
ADMIN_EMAIL
ADMIN_PASSWORD
```

Then open:

```text
http://localhost:3000/admin
```

## Replace Dummy Details

The public contact and social values are currently hardcoded in `frontend/src/lib/constants.ts`. Update them there if you want to change the displayed phone, email, address, WhatsApp link, or social links. Only the API/site URLs remain env-driven.

The placeholder social links are safe dummy destinations. Replace them with your exact profile/page URLs before advertising the site.

## Deploy on Render

The root `render.yaml` defines the frontend and API as two web services.

1. Push this repository to GitHub or GitLab.
2. Create a MongoDB Atlas database and copy its connection string.
3. In Render, choose **New > Blueprint**, connect the repository, and use `render.yaml`.
4. Supply the prompted secrets and URLs:
   - API: `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `FRONTEND_URL`
   - Frontend: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`
5. After Render assigns URLs, set:
   - `FRONTEND_URL=https://<frontend-service>.onrender.com`
   - `NEXT_PUBLIC_API_URL=https://<api-service>.onrender.com/api`
   - `NEXT_PUBLIC_SITE_URL=https://<frontend-service>.onrender.com`
6. Redeploy both services. Confirm `/api/health`, then sign in at `/admin`.

Optional backend environment variables:

- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` enable dashboard image uploads.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `ADMIN_EMAIL`, and optional `NOTIFY_EMAIL` enable enquiry email alerts.

Without Cloudinary, existing image URLs still display, but dashboard file uploads return a configuration error. Enquiries are stored in MongoDB even without SMTP.

## Launch Checklist

- Replace all dummy phone, email, address, map, and social values.
- Use a unique admin password and keep `JWT_SECRET`, MongoDB, Cloudinary, and SMTP credentials private.
- Add Cloudinary before uploading products from the dashboard.
- Add real products/offers in `/admin` and test one enquiry plus one newsletter signup.
- Set your custom domain on the frontend service, update `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL`, then redeploy.
- Review privacy/terms text for your actual billing, shipping, exchange, and data-retention policies.
