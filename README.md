# Verji

A premium, non-alcoholic verjus beverage — crafted from unripe grapes and natural Moroccan botanicals.

**Live site:** [verji.club](https://verji.club)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | JavaScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| CMS | Sanity.io |
| Payments | Stripe Checkout |
| Email / Newsletter | Resend |
| Hosting | Vercel |
| Domain | Squarespace Domains |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AndrewRot/verji.git
cd verji
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=your-sanity-dataset-name

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Resend
RESEND_API_KEY=your-resend-api-key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 5. Sanity Studio

The Sanity Studio is embedded at `/studio`. Visit [http://localhost:3000/studio](http://localhost:3000/studio) to manage products and content.

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub.
2. Import the repository on [Vercel](https://vercel.com).
3. Add the environment variables from `.env.local` to the Vercel project settings.
4. Deploy.

## Site Structure

| Section | Description |
|---------|-------------|
| Hero | Full-screen carousel with SVG wine bottles, per-product liquid colors, and wrapped logo labels |
| About | Brand story, Moroccan ingredient sourcing, and feature highlights |
| Shop | Product grid powered by Sanity CMS with Stripe checkout |
| Media | Press quotes and testimonials |
| Footer | Newsletter signup (Resend), social links, and contact info |

## Resource Links

| Resource | URL |
|----------|-----|
| Website | [verji.club](https://verji.club) |
| Squarespace Domains | [account.squarespace.com/domains](https://account.squarespace.com/domains) |
| GitHub | [github.com/AndrewRot/verji](https://github.com/AndrewRot/verji) |
| Sanity | [sanity.io — Verji project](https://www.sanity.io/organizations/oDw3bJnoG/project/3s6p4hzf?orgId=oDw3bJnoG) |
| Vercel | [vercel.com — Verji deployment](https://vercel.com/andrew-rottiers-projects/verji/3G3BxDv1UAhUhn7zSXuRTaJ2sp47) |
| Stripe | [stripe.com — Dashboard](https://dashboard.stripe.com/acct_1T7O3WAQw4313lFr/test/dashboard) |
| Resend | [resend.com](https://resend.com/) |
