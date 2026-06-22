import { fetchRoles } from "@/lib/ashby";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import ProjectsSection from "@/components/ProjectsSection";
import Roles from "@/components/Roles";
import AlertSignup from "@/components/AlertSignup";
import {
  StatsBand,
  Mission,
  Team,
  Gallery,
  Values,
  Perks,
  Process,
  Footer,
} from "@/components/Sections";

// Revalidate every hour so open roles stay fresh automatically
export const revalidate = 3600;

const BASE_URL = "https://imagine.art";

export default async function CareersPage() {
  const roles = await fetchRoles();
  const departments = Array.from(new Set(roles.map((r) => r.dept))).sort();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ImagineArt",
    url: BASE_URL,
    logo: `${BASE_URL}/imagine-logo.svg`,
    description:
      "ImagineArt is a creative AI platform that lets anyone generate images, video, and music using frontier AI models on a single canvas. Founded in 2018 and bootstrapped from Pakistan, ImagineArt serves 800,000+ daily active users with 150M+ total downloads.",
    foundingDate: "2018",
    foundingLocation: "Islamabad, Pakistan",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
    sameAs: [
      "https://www.linkedin.com/company/imagineart",
      "https://twitter.com/imagine_art",
      "https://www.instagram.com/imagine.art",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "talent@imagine.art",
      contactType: "HR / Recruitment",
    },
  };

  const jobPostingSchemas = roles.map((r) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: r.title,
    description: `${r.title} role at ImagineArt — a creative AI platform with 800K+ daily active users. Department: ${r.dept}. Work type: ${r.workplace}.`,
    identifier: { "@type": "PropertyValue", name: "ImagineArt", value: r.id },
    hiringOrganization: {
      "@type": "Organization",
      name: "ImagineArt",
      sameAs: BASE_URL,
      logo: `${BASE_URL}/imagine-logo.svg`,
    },
    employmentType: r.type.toUpperCase().replace("-", "_"),
    jobLocationType: r.workplace === "Remote" ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements:
      r.workplace === "Remote"
        ? { "@type": "Country", name: "Worldwide" }
        : undefined,
    jobLocation:
      r.workplace !== "Remote"
        ? { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: r.loc } }
        : undefined,
    url: r.url,
    directApply: true,
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is ImagineArt located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ImagineArt is headquartered in Islamabad, Pakistan with an additional office in San Francisco. Many roles are also available remotely.",
        },
      },
      {
        "@type": "Question",
        name: "How long does the ImagineArt hiring process take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ImagineArt moves fast — from first conversation to offer usually takes 1–2 weeks. The process is: Apply → Intro call → Technical round → Task round → Co-founder round → Offer.",
        },
      },
      {
        "@type": "Question",
        name: "Does ImagineArt hire remotely?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. ImagineArt has both on-site roles in Islamabad and fully remote roles open to candidates worldwide. Check the open roles section and use the Remote filter.",
        },
      },
      {
        "@type": "Question",
        name: "What does ImagineArt do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ImagineArt bundles every frontier AI model — image generation, video synthesis, music creation, and editing — into one creative canvas. It serves 800,000+ daily active users, has 150M+ total downloads, and generates $35M+ in annual recurring revenue.",
        },
      },
      {
        "@type": "Question",
        name: "Who founded ImagineArt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ImagineArt was co-founded in 2018 by Ahmed Abubakr (CEO), Abdullah Rafique (CTO), and Zain ul Abedien (CGO). The company was bootstrapped from Pakistan with no outside funding.",
        },
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Careers at ImagineArt",
    url: `${BASE_URL}/careers`,
    description:
      "Browse open roles at ImagineArt — the creative AI platform with 800K+ daily active users. Jobs in engineering, design, marketing and more.",
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "ImagineArt", url: BASE_URL },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ImagineArt", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Careers", item: `${BASE_URL}/careers` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {jobPostingSchemas.map((s) => (
        <script key={s.identifier.value} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Hero />
      <Nav />
      <main className="page" id="top" style={{ overflowX: "clip" }}>
        <StatsBand />
        <Mission />
        <MarqueeSection />
        <Team />
        <ProjectsSection />
        <Values />
        <Perks />
        <Process />
        <Roles roles={roles} />
        <AlertSignup departments={departments} />
        <Footer />
      </main>
    </>
  );
}
