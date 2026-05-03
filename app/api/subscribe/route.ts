import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = (body as { email?: string })?.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // V1 : log côté serveur. À remplacer par Resend / Mailchimp / DB en prod.
  console.log("[subscribe] new lead:", email);

  return NextResponse.json({ ok: true }, { status: 200 });
}
