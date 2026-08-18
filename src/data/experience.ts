export interface ExperienceItem {
  role: string;
  org: string;
  location: string;
  period: string;
  summary: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Executive — Digital Advertising",
    org: "ServicEngine Limited (SEBPO)",
    location: "Dhaka, Bangladesh",
    period: "Aug 2021 — Feb 2022",
    summary:
      "Led digital advertising operations for client accounts, coordinating teams, platforms and workflows to keep delivery on target.",
    points: [
      "Led team operations to meet client goals",
      "Maintained workflow using Jira and Google Ad Manager",
      "Onboarded and trained new resources",
      "Worked with Adbook+ and LiveIntent",
      "Worked with automation tools to streamline delivery",
      "Coordinated cross-functional processes",
      "Supported service quality and client satisfaction",
    ],
  },
];
