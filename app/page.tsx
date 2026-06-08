import { fetchRoles } from "@/lib/ashby";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Roles from "@/components/Roles";
import {
  StatsBand,
  Mission,
  Team,
  Gallery,
  Values,
  Perks,
  Process,
  CTA,
  Footer,
} from "@/components/Sections";

// Revalidate every hour so open roles stay fresh automatically
export const revalidate = 3600;

export default async function CareersPage() {
  const roles = await fetchRoles();

  return (
    <>
      <div className="ambient" />
      <Nav />
      <main className="page" id="top">
        <section className="section" style={{ paddingTop: 24, paddingBottom: 96 }}>
          <Hero roleCount={roles.length} />
        </section>
        <StatsBand />
        <Mission />
        <Gallery />
        <Team />
        <Process />
        <Roles roles={roles} />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
