import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { stripePriceId, quantity } = await req.json();
  console.log('STRIPE REQUEST: stripePriceId:', stripePriceId);
  console.log('STRIPE REQUEST: quantity:', quantity);

  if (!stripePriceId || !quantity) {
    return NextResponse.json({ error: 'Missing stripePriceId or quantity' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // line_items: [

      line_items: [
        {
          price: stripePriceId,
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe Error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
