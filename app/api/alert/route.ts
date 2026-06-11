import { NextResponse } from "next/server";

const BASE = "https://api.ashbyhq.com";

function ashbyAuth(apiKey: string) {
  return `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
}

function nameFromEmail(email: string): string {
  const local = email.split("@")[0];
  return local
    .split(/[._\-+]/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}

async function ashbyPost(apiKey: string, endpoint: string, body: object) {
  const res = await fetch(`${BASE}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ashbyAuth(apiKey),
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function POST(req: Request) {
  const body = await req.json();
  const email: string = (body.email ?? "").trim().toLowerCase();
  const department: string = body.department ?? "Any";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const apiKey = process.env.ASHBY_API_KEY;
  if (!apiKey) {
    console.log("[alert signup]", { email, department });
    return NextResponse.json({ ok: true });
  }

  // Create candidate in Ashby
  const created = await ashbyPost(apiKey, "candidate.create", {
    name: nameFromEmail(email),
    email,
  }).catch((err) => { console.error("[alert] candidate.create failed", err); return null; });

  // Add a note so recruiters can see department interest and source
  if (created?.success && created.results?.id) {
    await ashbyPost(apiKey, "candidate.createNote", {
      candidateId: created.results.id,
      note: `Role alert signup via careers page\nDepartment interest: ${department}`,
      sendNotifications: false,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
