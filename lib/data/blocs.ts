export type Bloc = {
  roman: string;
  num: number;
  title: string;
  subtitle: string;
  modules: string;
};

export const blocs: Bloc[] = [
  {
    roman: "I",
    num: 1,
    title: "Fondation",
    subtitle: "Comprendre qui est le dirigeant selon Dieu",
    modules: "Modules 1 — 4",
  },
  {
    roman: "II",
    num: 2,
    title: "Exigences spirituelles",
    subtitle: "Les 4 disciplines non-négociables",
    modules: "Modules 5 — 8",
  },
  {
    roman: "III",
    num: 3,
    title: "Sagesse & Gouvernance",
    subtitle: "Vision, conseil, équipe",
    modules: "Modules 9 — 10",
  },
  {
    roman: "IV",
    num: 4,
    title: "Gestion de la gloire",
    subtitle: "Argent, honneurs, fidélité, humilité",
    modules: "Modules 11 — 12",
  },
];
