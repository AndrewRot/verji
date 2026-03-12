import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Required so Stripe can verify the webhook signature against the raw body
export const runtime = 'nodejs';

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email;

    if (email) {
      const firstName = session.customer_details?.name?.split(' ')[0] ?? '';
      const lastName = session.customer_details?.name?.split(' ').slice(1).join(' ') ?? '';

      await Promise.all([
        resend.contacts.create({
          audienceId: process.env.RESEND_CUSTOMERS_AUDIENCE_ID,
          email,
          firstName,
          lastName,
          unsubscribed: false,
        }).catch(err => {
          if (err?.statusCode !== 422 && err?.name !== 'validation_error') {
            console.error('Resend customer sync error:', err);
          }
        }),
        resend.contacts.create({
          audienceId: process.env.RESEND_ALL_EMAILS_AUDIENCE_ID,
          email,
          firstName,
          lastName,
          unsubscribed: false,
        }).catch(err => {
          if (err?.statusCode !== 422 && err?.name !== 'validation_error') {
            console.error('Resend all-emails sync error:', err);
          }
        }),
      ]);
    }
  }

  return NextResponse.json({ received: true });
}
