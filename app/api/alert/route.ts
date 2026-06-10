import { NextResponse } from "next/server";

// To wire up storage, set ALERT_WEBHOOK_URL in .env.local to any of:
//   Google Sheets (Apps Script web app URL)
//   Loops.so  POST https://app.loops.so/api/v1/contacts/create  with Authorization header
//   Zapier / Make webhook URL
//
// Google Apps Script starter:
//   function doPost(e) {
//     const d = JSON.parse(e.postData.contents);
//     SpreadsheetApp.openById("YOUR_SHEET_ID")
//       .getActiveSheet().appendRow([d.timestamp, d.email, d.department]);
//     return ContentService.createTextOutput("ok");
//   }

export async function POST(req: Request) {
  const body = await req.json();
  const email: string = (body.email ?? "").trim();
  const department: string = body.department ?? "Any";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const webhookUrl = process.env.ALERT_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, department, timestamp: new Date().toISOString() }),
      });
    } catch (err) {
      console.error("[alert] webhook failed", err);
    }
  } else {
    console.log("[alert signup]", { email, department });
  }

  return NextResponse.json({ ok: true });
}
