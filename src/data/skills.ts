export interface SkillGroup {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  skills: { name: string; note?: string }[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    title: "Programming & Development",
    icon: "code",
    blurb: "The languages behind the firmware and tooling.",
    skills: [
      { name: "C", note: "Systems & embedded C" },
      { name: "Python", note: "Scripting & tooling" },
      { name: "Arduino IDE", note: "Microcontroller firmware" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering & Simulation",
    icon: "cpu",
    blurb: "Designing and verifying circuits before hardware.",
    skills: [
      { name: "MATLAB", note: "Analysis & simulation" },
      { name: "PSpice", note: "Circuit simulation" },
    ],
  },
  {
    id: "automation",
    title: "Automation & Productivity",
    icon: "zap",
    blurb: "Removing repetition with scripts and workflow systems.",
    skills: [
      { name: "AutoIt", note: "Windows automation scripting" },
      { name: "Pulover's Macro", note: "Macro recording & playback" },
      { name: "Jira", note: "Workflow & project tracking" },
    ],
  },
  {
    id: "adtech",
    title: "Advertising Technology",
    icon: "bar-chart",
    blurb: "Managing and optimizing digital advertising supply.",
    skills: [{ name: "Google Ad Manager", note: "Ad operations & delivery" }],
  },
  {
    id: "systems",
    title: "Systems & IT",
    icon: "monitor",
    blurb: "Hardware, operating systems and everyday technical support.",
    skills: [
      { name: "Windows OS", note: "7 · 8 · 10 · 11" },
      { name: "IT Support & Hardware", note: "Install & configure" },
      { name: "MS Office Suite", note: "Word · Excel · PowerPoint" },
    ],
  },
];
