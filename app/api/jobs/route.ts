import { NextResponse } from "next/server";
import { fetchRoles } from "@/lib/ashby";

// Used by the client if it ever needs to refresh roles on demand
export async function GET() {
  const roles = await fetchRoles();
  return NextResponse.json(roles, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
