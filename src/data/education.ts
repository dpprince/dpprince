export interface EducationItem {
  degree: string;
  field?: string;
  school: string;
  board: string;
  score: string;
  scoreScale: string;
  year: string;
}

export const education: EducationItem[] = [
  {
    degree: "B.Sc. in Electrical & Electronic Engineering",
    school: "Eastern University",
    board: "EEE",
    score: "3.22",
    scoreScale: "4.00",
    year: "2019",
  },
  {
    degree: "Higher Secondary Certificate — Science",
    school: "Joypurhat Govt. College",
    board: "Rajshahi",
    score: "4.70",
    scoreScale: "5.00",
    year: "2012",
  },
  {
    degree: "Secondary School Certificate — Science",
    school: "K G & High School, JSM",
    board: "Rajshahi",
    score: "5.00",
    scoreScale: "5.00",
    year: "2010",
  },
];
