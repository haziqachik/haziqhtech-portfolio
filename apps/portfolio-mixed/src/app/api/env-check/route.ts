import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 5) || 'not set',
    contactEmail: process.env.CONTACT_EMAIL || 'not set',
    nodeEnv: process.env.NODE_ENV,
  });
}
