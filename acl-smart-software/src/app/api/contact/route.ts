import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Câmpuri obligatorii lipsă.' }, { status: 400 });
    }

    // In production: send email via Resend, SendGrid, or similar
    console.log('Contact form submission:', body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Eroare server.' }, { status: 500 });
  }
}
