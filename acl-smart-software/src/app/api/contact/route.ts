import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function emailTemplate({
  name,
  email,
  company,
  budget,
  message,
}: {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}) {
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Mesaj nou — ACL Smart Software</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0d0d0d;padding:28px 40px;text-align:left;">
              <span style="font-family:'Courier New',monospace;font-size:22px;font-weight:700;color:#aaff44;letter-spacing:-0.04em;">&gt;_</span>
              <span style="font-size:16px;font-weight:600;color:#ffffff;margin-left:10px;letter-spacing:-0.02em;">ACL Smart Software</span>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:36px 40px 8px;">
              <p style="margin:0;font-size:11px;font-family:'Courier New',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#999;">Mesaj nou prin formularul de contact</p>
              <h1 style="margin:10px 0 0;font-size:24px;font-weight:700;color:#0d0d0d;letter-spacing:-0.02em;">${name}</h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #eee;margin:20px 0;" /></td></tr>

          <!-- Details -->
          <tr>
            <td style="padding:0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;width:110px;font-size:12px;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.06em;color:#999;vertical-align:top;">Email</td>
                  <td style="padding:8px 0;font-size:15px;color:#0d0d0d;">
                    <a href="mailto:${email}" style="color:#0d0d0d;text-decoration:none;font-weight:600;">${email}</a>
                  </td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding:8px 0;font-size:12px;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.06em;color:#999;vertical-align:top;">Companie</td>
                  <td style="padding:8px 0;font-size:15px;color:#0d0d0d;">${company}</td>
                </tr>` : ''}
                ${budget ? `
                <tr>
                  <td style="padding:8px 0;font-size:12px;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.06em;color:#999;vertical-align:top;">Buget</td>
                  <td style="padding:8px 0;">
                    <span style="display:inline-block;background:#f0fff4;color:#1a7a3a;font-size:13px;font-weight:600;padding:4px 12px;border-radius:999px;">${budget}</span>
                  </td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #eee;margin:20px 0;" /></td></tr>

          <!-- Message -->
          <tr>
            <td style="padding:0 40px 36px;">
              <p style="margin:0 0 10px;font-size:12px;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.06em;color:#999;">Mesaj</p>
              <div style="background:#f8f8f8;border-left:3px solid #aaff44;border-radius:0 8px 8px 0;padding:18px 20px;">
                <p style="margin:0;font-size:15px;line-height:1.7;color:#333;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 36px;">
              <a href="mailto:${email}?subject=Re: Proiect ACL Smart Software"
                 style="display:inline-block;background:#0d0d0d;color:#aaff44;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em;">
                Răspunde → ${email}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f8f8;padding:20px 40px;border-top:1px solid #eee;">
              <p style="margin:0;font-size:12px;color:#999;line-height:1.6;">
                ACL Smart Software SRL · office@acl-smartsoftware.ro<br/>
                Str. Horea 2/31, Petroșani · CUI 51219715
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Câmpuri obligatorii lipsă.' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'ACL Smart Software <office@acl-smartsoftware.ro>',
      to: 'office@acl-smartsoftware.ro',
      replyTo: email,
      subject: `[Contact] ${name}${company ? ` — ${company}` : ''}${budget ? ` · ${budget}` : ''}`,
      html: emailTemplate({ name, email, company, budget, message }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Eroare server.' }, { status: 500 });
  }
}
