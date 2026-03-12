import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  const { email } = await req.json();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    const response = await resend.contacts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID,
      email,
      unsubscribed: false,
    });
    console.log('Resend response:', JSON.stringify(response))

    return NextResponse.json({ success: true });
  } catch (err) {
    // Resend returns a 422 when the contact already exists in the audience
    if (err?.statusCode === 422 || err?.name === 'validation_error') {
      return NextResponse.json(
        { error: "You're already subscribed — thank you!" },
        { status: 422 }
      );
    }

    console.error('Resend newsletter error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
