# Verji - A Premium Verjus Beverage Website

This is a production-ready, single-page ecommerce website for Verji, a premium verjus beverage company.

## 🏗 Tech Stack

*   **Framework**: Next.js (App Router)
*   **Language**: JavaScript
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion
*   **CMS / Database**: Sanity.io
*   **Payments**: Stripe Checkout

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd verji
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=your-sanity-dataset-name

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

### 4. Set up Sanity Studio

Navigate to the `sanity` directory and install the dependencies:

```bash
cd sanity
npm install
```

To run the Sanity Studio locally, use:

```bash
npm run dev
```

You can then visit `http://localhost:3333` to access the studio. You will need to create a `product` schema and add your products.

### 5. Run the development server

Navigate back to the root directory and run the development server:

```bash
cd ..
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

This project is optimized for deployment on Vercel. 

1.  Push your code to a Git repository.
2.  Import the repository on Vercel.
3.  Add the environment variables from your `.env.local` file to the Vercel project settings.
4.  Deploy!

## 🎨 Design & Structure

The website is a single-page application with a premium, minimal, and elegant design. It features smooth animations and a responsive layout.

*   **Hero Section**: An interactive, full-screen section with a draggable product carousel.
*   **About Section**: Information about the brand and product.
*   **Shop Section**: A grid of products that open a modal for purchase.

