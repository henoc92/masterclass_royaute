import { PageRoot } from "@/components/PageRoot";

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Masterclass Royauté — Impacter et diriger en milieu hostile",
  description:
    "Une formation chrétienne de leadership en 12 modules / 24 sessions / ~12 heures, fondée sur les enseignements de l'Apôtre Yves Castanou.",
  provider: {
    "@type": "Organization",
    name: "Masterclass Royauté",
    sameAs: "https://masterclass-royaute.com",
  },
  inLanguage: "fr",
  educationalLevel: "Adulte — Dirigeants",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: "PT12H",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <PageRoot />
    </>
  );
}
