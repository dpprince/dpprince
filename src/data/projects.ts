export interface Project {
  id: string;
  index: string;
  title: string;
  type: string;
  tags: string[];
  description: string;
  details: string[];
  visual: "ecg" | "rocket" | "embedded";
  featured?: boolean;
}

export interface EmbeddedSubProject {
  name: string;
  note: string;
  icon: string;
}

export const embeddedSubProjects: EmbeddedSubProject[] = [
  {
    name: "Smart Home Automation",
    note: "Automated control of household systems.",
    icon: "home",
  },
  {
    name: "Fire Detector & Alarm",
    note: "Sensing and alerting on fire conditions.",
    icon: "flame",
  },
  {
    name: "Power Factor Correction",
    note: "Reactive power analysis in MATLAB.",
    icon: "wave",
  },
  {
    name: "Remote-controlled Aircraft",
    note: "Small-scale battery-powered RC aircraft.",
    icon: "plane",
  },
  {
    name: "Smart RC Car",
    note: "Remote-controlled vehicle prototype.",
    icon: "car",
  },
];

export const projects: Project[] = [
  {
    id: "ecg",
    index: "01",
    title: "Smart ECG Monitoring System",
    type: "Arduino · Embedded Systems · Engineering Thesis",
    tags: ["Arduino", "Signal Processing", "Biomedical"],
    description:
      "An Arduino-based, low-cost Smart ECG monitoring system prototype — my undergraduate thesis, supervised by Prof. Dr. Md. Aynal Haque.",
    details: [
      "Built on Arduino for accessible, low-cost cardiac signal monitoring",
      "Thesis research into practical biomedical instrumentation",
      "Designed to be reproducible with affordable off-the-shelf components",
    ],
    visual: "ecg",
    featured: true,
  },
  {
    id: "rocketry",
    index: "02",
    title: "Rocketry Research & Innovation Challenge",
    type: "Engineering Research · Aerospace",
    tags: ["Research", "Aerospace", "Innovation"],
    description:
      "Independent rocketry research exploring the prospects of rocketry in the Bangladeshi context, spanning 2022–2025.",
    details: [
      "Independent research focused on a Bangladeshi context",
      "Research period spanning 2022–2025",
      "Nominated for the Rocketry Innovation Challenge 2022 at BSMRAAU",
    ],
    visual: "rocket",
    featured: true,
  },
  {
    id: "embedded",
    index: "03",
    title: "Embedded Systems & Automation",
    type: "Project Ecosystem · Academic Work",
    tags: ["Embedded", "Automation", "Simulation"],
    description:
      "A family of academic projects exploring embedded control, automation and simulation — from smart-home control to MATLAB-based power analysis.",
    details: [
      "Hands-on embedded systems and control projects",
      "Covers automation, sensing, power and remote control",
      "Built during undergraduate engineering study",
    ],
    visual: "embedded",
  },
];
