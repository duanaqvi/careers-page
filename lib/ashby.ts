export interface Role {
  id: string;
  title: string;
  dept: string;
  loc: string;
  type: string;
  remote: boolean;
  workplace: "Remote" | "Hybrid" | "On-site";
  url: string;
}

function mapEmploymentType(raw: string): string {
  const map: Record<string, string> = {
    FullTime: "Full-time",
    PartTime: "Part-time",
    Contract: "Contract",
    Internship: "Internship",
    Temporary: "Temporary",
  };
  return map[raw] ?? raw;
}

export async function fetchRoles(): Promise<Role[]> {
  const apiKey = process.env.ASHBY_API_KEY;
  if (!apiKey) {
    console.error("ASHBY_API_KEY is not set");
    return STATIC_ROLES;
  }

  try {
    const credentials = Buffer.from(`${apiKey}:`).toString("base64");
    const res = await fetch("https://api.ashbyhq.com/jobPosting.list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({}),
      next: { revalidate: 3600 }, // refresh every hour
    });

    if (!res.ok) throw new Error(`Ashby returned ${res.status}`);

    const data = await res.json();
    if (!data.success || !Array.isArray(data.results)) throw new Error("Unexpected Ashby response");

    return data.results
      .filter((j: Record<string, unknown>) => j.isListed !== false)
      .map((j: Record<string, unknown>) => ({
        id: String(j.id ?? ""),
        title: String(j.title ?? ""),
        dept: String(j.departmentName ?? "Other"),
        loc: String(j.locationName ?? "Remote"),
        type: mapEmploymentType(String(j.employmentType ?? "FullTime")),
        remote: j.workplaceType === "Remote",
        workplace: j.workplaceType === "Remote" ? "Remote" : j.workplaceType === "Hybrid" ? "Hybrid" : "On-site",
        url: String(j.externalLink ?? j.applyLink ?? ""),
      }));
  } catch (err) {
    console.error("Failed to fetch Ashby roles:", err);
    return STATIC_ROLES;
  }
}

// Fallback static data — used when the API is unavailable
const STATIC_ROLES: Role[] = [
  { id: "f46b2593", title: "Graphic Designer", dept: "Product & Design", loc: "Islamabad", type: "Full-time", remote: false, workplace: "On-site", url: "https://jobs.ashbyhq.com/imagineart/f46b2593-e4a7-4dd1-9445-61ca00d0d903" },
  { id: "fe03f835", title: "Product Designer", dept: "Product & Design", loc: "Islamabad", type: "Full-time", remote: false, workplace: "On-site", url: "https://jobs.ashbyhq.com/imagineart/fe03f835-b5a0-4cde-b43b-925f081e4622" },
  { id: "24665c44", title: "Creator Community Manager", dept: "Growth & Marketing", loc: "Islamabad", type: "Full-time", remote: false, workplace: "On-site", url: "https://jobs.ashbyhq.com/imagineart/24665c44-110d-41a0-837e-bda275f49486" },
  { id: "eb362dae", title: "Associate MLOps Engineer", dept: "Engineering", loc: "Islamabad", type: "Full-time", remote: false, workplace: "On-site", url: "https://jobs.ashbyhq.com/imagineart/eb362dae-d3cc-4908-99d9-84e16653d403" },
  { id: "efed24c0", title: "Principal AI Engineer (LLM Agents)", dept: "Engineering", loc: "India", type: "Full-time", remote: true, workplace: "Remote", url: "https://jobs.ashbyhq.com/imagineart/efed24c0-7f4a-4381-8f22-1975e5f46795" },
  { id: "a328e9b4", title: "Full Stack AI Engineer", dept: "Engineering", loc: "Islamabad", type: "Full-time", remote: false, workplace: "On-site", url: "https://jobs.ashbyhq.com/imagineart/a328e9b4-0dc5-4628-a444-9372655daece" },
  { id: "0d37ec79", title: "Senior Frontend Engineer", dept: "Engineering", loc: "Islamabad", type: "Full-time", remote: false, workplace: "On-site", url: "https://jobs.ashbyhq.com/imagineart/0d37ec79-0aa8-4605-a06b-9a0c64cdf736" },
  { id: "85f2b012", title: "Agentic AI Engineer", dept: "Engineering", loc: "Islamabad", type: "Full-time", remote: false, workplace: "On-site", url: "https://jobs.ashbyhq.com/imagineart/85f2b012-08d5-4abc-b708-6e71e8d2e1a3" },
  { id: "17028e2c", title: "Sales Development Representative", dept: "Operations", loc: "San Francisco", type: "Full-time", remote: false, workplace: "On-site", url: "https://jobs.ashbyhq.com/imagineart/17028e2c-bc91-495b-a24c-a1b2b3c7216f" },
  { id: "90493a38", title: "Soul Team — Writers & Thinkers", dept: "Soul", loc: "Islamabad", type: "Full-time", remote: false, workplace: "On-site", url: "https://jobs.ashbyhq.com/imagineart/90493a38-4e04-4e06-bf22-50a714c8e758" },
];
