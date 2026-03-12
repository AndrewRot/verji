import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  const { email } = await req.json();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const [newsletterResult, allEmailsResult] = await Promise.all([
    resend.contacts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID,
      email,
      unsubscribed: false,
    }).catch(err => ({ error: err })),
    resend.contacts.create({
      audienceId: process.env.RESEND_ALL_EMAILS_AUDIENCE_ID,
      email,
      unsubscribed: false,
    }).catch(err => ({ error: err })),
  ]);

  console.log('Resend newsletter response:', JSON.stringify(newsletterResult));

  // Newsletter audience failure determines the response
  if (newsletterResult.error) {
    const err = newsletterResult.error;
    if (err?.statusCode === 422 || err?.name === 'validation_error') {
      return NextResponse.json(
        { error: "You're already subscribed — thank you!" },
        { status: 422 }
      );
    }
    console.error('Resend newsletter error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  // All-emails audience failure is logged but doesn't affect the response
  if (allEmailsResult.error) {
    const err = allEmailsResult.error;
    if (err?.statusCode !== 422 && err?.name !== 'validation_error') {
      console.error('Resend all-emails audience error:', err);
    }
  }

  return NextResponse.json({ success: true });
}
