export interface Certification {
  title: string;
  issuer: string;
  detail: string;
  year: string;
}

export const certifications: Certification[] = [
  {
    title: "Korean Language Training Course",
    issuer: "Bangladesh-Korea Technical Training Centre",
    detail: "125 days · Marks: 85 / 100",
    year: "2025",
  },
  {
    title: "CCNA (200-301)",
    issuer: "Creative IT Institute",
    detail: "93 days · Networking",
    year: "2020",
  },
  {
    title: "Communication Skills",
    issuer: "Manarat International University",
    detail: "2 days · Workshop",
    year: "2019",
  },
];
