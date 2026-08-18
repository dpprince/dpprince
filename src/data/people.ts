export interface Language {
  name: string;
  level: "Native" | "Fluent" | "Moderate" | "Basic";
  note: string;
}

export const languages: Language[] = [
  { name: "Bangla", level: "Native", note: "Mother tongue" },
  { name: "English", level: "Fluent", note: "Professional working proficiency" },
  { name: "Korean", level: "Moderate", note: "Korean Language Training Course" },
  { name: "Hindi", level: "Basic", note: "Conversational basics" },
];

export interface LeadershipItem {
  role: string;
  org: string;
  icon: string;
}

export const leadership: LeadershipItem[] = [
  {
    role: "Membership Development",
    org: "IEEE Eastern University Student Branch",
    icon: "ieee",
  },
  {
    role: "Joint Secretary",
    org: "Eastern University Electronics Club",
    icon: "circuit",
  },
  {
    role: "Performer",
    org: "Eastern University Cultural Club",
    icon: "mic",
  },
];

export interface Activity {
  name: string;
  icon: string;
}

export const extracurricular: Activity[] = [
  { name: "Voice-over & Content Creation", icon: "mic" },
  { name: "Music", icon: "music" },
  { name: "Debate", icon: "gavel" },
  { name: "Reciting", icon: "book" },
  { name: "Strategic games & bug testing", icon: "gamepad" },
];
