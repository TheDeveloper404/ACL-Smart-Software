import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Câmpuri obligatorii lipsă.' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'ACL Smart Software <onboarding@resend.dev>',
      to: 'office@acl-smartsoftware.ro',
      replyTo: email,
      subject: `[Contact] ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <h2 style="margin-bottom:24px">Mesaj nou prin formularul de contact</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:120px">Nume</td><td style="padding:8px 0"><strong>${name}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#666">Companie</td><td style="padding:8px 0">${company}</td></tr>` : ''}
            ${budget ? `<tr><td style="padding:8px 0;color:#666">Buget</td><td style="padding:8px 0">${budget}</td></tr>` : ''}
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
          <p style="color:#666;margin-bottom:8px">Mesaj:</p>
          <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Eroare server.' }, { status: 500 });
  }
}
