import { NextResponse } from "next/server";

const BASE = "https://api.ashbyhq.com";
const TALENT_POOL_JOB_ID = "a6a3452b-07f0-4e5f-b183-41ab75a7cbe9";

function ashbyAuth(apiKey: string) {
  return `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
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
  const name: string     = (body.name    ?? "").trim();
  const email: string    = (body.email   ?? "").trim().toLowerCase();
  const about: string    = (body.about   ?? "").trim();
  const linkedIn: string = (body.linkedIn ?? "").trim();

  if (!name || !email || !email.includes("@")) {
    return NextResponse.json({ error: "name and email are required" }, { status: 400 });
  }

  const apiKey = process.env.ASHBY_API_KEY;
  if (!apiKey) {
    console.log("[alert signup]", { name, email, about, linkedIn });
    return NextResponse.json({ ok: true });
  }

  // 1. Create candidate with all available info
  const candidatePayload: Record<string, string> = { name, email };
  if (linkedIn) candidatePayload.linkedInUrl = linkedIn;

  const created = await ashbyPost(apiKey, "candidate.create", candidatePayload)
    .catch((err) => { console.error("[alert] candidate.create failed", err); return null; });

  if (!created?.success || !created.results?.id) {
    console.warn("[alert] candidate not created:", created?.errors ?? created?.errorInfo ?? "unknown");
    return NextResponse.json({ ok: true });
  }

  const candidateId: string = created.results.id;

  // 2. Submit application against the Talent Pool job
  const applied = await ashbyPost(apiKey, "application.create", {
    jobId: TALENT_POOL_JOB_ID,
    candidateId,
  }).catch((err) => { console.error("[alert] application.create failed", err); return null; });

  // 3. Note with full context for recruiters
  if (applied?.success && applied.results?.id) {
    const noteLines = [
      `Source: Role alert signup via careers page`,
      about    ? `About: ${about}`        : null,
      linkedIn ? `LinkedIn: ${linkedIn}`  : null,
    ].filter(Boolean).join("\n");

    await ashbyPost(apiKey, "candidate.createNote", {
      candidateId,
      note: noteLines,
      sendNotifications: false,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
