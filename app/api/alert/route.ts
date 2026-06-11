import { NextResponse } from "next/server";

const BASE = "https://api.ashbyhq.com";
// Talent Pool job — all role-alert signups land here as applications
const TALENT_POOL_JOB_ID = "a6a3452b-07f0-4e5f-b183-41ab75a7cbe9";

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

  // 1. Create candidate
  const created = await ashbyPost(apiKey, "candidate.create", {
    name: nameFromEmail(email),
    email,
  }).catch((err) => { console.error("[alert] candidate.create failed", err); return null; });

  if (!created?.success || !created.results?.id) {
    // Candidate may already exist — still return success to the user
    console.warn("[alert] candidate not created:", created?.errors ?? "unknown");
    return NextResponse.json({ ok: true });
  }

  const candidateId: string = created.results.id;

  // 2. Submit application against the Talent Pool job
  const applied = await ashbyPost(apiKey, "application.create", {
    jobId: TALENT_POOL_JOB_ID,
    candidateId,
  }).catch((err) => { console.error("[alert] application.create failed", err); return null; });

  // 3. Add a note with department interest
  if (applied?.success && applied.results?.id) {
    await ashbyPost(apiKey, "candidate.createNote", {
      candidateId,
      note: `Role alert signup via careers page\nDepartment interest: ${department}`,
      sendNotifications: false,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
