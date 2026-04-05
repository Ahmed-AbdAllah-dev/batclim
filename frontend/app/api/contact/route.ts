// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises as dns } from 'dns';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID   = process.env.TELEGRAM_CHAT_ID!;

// ─── Email Validation ─────────────────────────────────────────────────────────

// Step 1: Check email format with regex
function isValidEmailFormat(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Step 2: Check if the email domain has MX records (real mail server)
async function hasMxRecords(email: string): Promise<boolean> {
  try {
    const domain = email.split('@')[1];
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false; // domain doesn't exist or has no MX records
  }
}

// ─── API Route ────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    // 1. Check required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Check email format
    if (!isValidEmailFormat(email)) {
      return NextResponse.json(
        { error: 'Invalid email format. Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 3. Check MX records (does this domain actually receive emails?)
    const mxValid = await hasMxRecords(email);
    if (!mxValid) {
      return NextResponse.json(
        { error: 'Email domain does not exist or cannot receive emails. Please check your email address.' },
        { status: 400 }
      );
    }

    // 4. Send to Telegram
    const text = `
🔔 *New Contact Request — Batclim*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone}
🏢 *Company:* ${company || 'N/A'}

💬 *Message:*
${message}
    `.trim();

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'Markdown',
        }),
      }
    );

    const telegramData = await telegramRes.json();

    if (!telegramData.ok) {
      console.error('Telegram error:', telegramData);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}