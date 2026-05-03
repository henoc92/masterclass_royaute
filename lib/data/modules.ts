export type Session = {
  num: string;
  title: string;
  /** Optionnel — phrase d'introduction avant la liste */
  lead?: string;
  /** Liste des points de la session (toujours un tableau) */
  points: string[];
};

export type ModuleIconKey =
  | "key"
  | "eyeSpirit"
  | "arrowHeart"
  | "harp"
  | "dove"
  | "shieldHeart"
  | "scrollSound"
  | "mountainAnchor"
  | "compass"
  | "team"
  | "scale"
  | "columnRoots";

export type Module = {
  num: string;
  blocRoman: string;
  blocNum: 1 | 2 | 3 | 4;
  title: string;
  theme: string;
  /** Clé du picto associé au module (PDF Masterclass Royauté) */
  icon: ModuleIconKey;
  sessions: [Session, Session];
};

export const modules: Module[] = [
  {
    num: "01",
    blocRoman: "I",
    blocNum: 1,
    title: "Introduction à la Royauté",
    theme: "Comprendre ce que Dieu attend de ses dirigeants",
    icon: "key",
    sessions: [
      {
        num: "1.1",
        title: "Qu'est-ce que la Royauté ?",
        points: [
          "Définition de la royauté",
          "Les niveaux : faiseur de rois · conseiller · porteur de position",
          "Royauté visible et royauté invisible",
        ],
      },
      {
        num: "1.2",
        title: "Pourquoi cette formation ? Le but du camp",
        points: [
          "Préparer, former, équiper, affermir",
          "La loi de la préparation",
        ],
      },
    ],
  },
  {
    num: "02",
    blocRoman: "I",
    blocNum: 1,
    title: "La Vie est Spirituelle",
    theme: "Le principe fondamental que tout dirigeant doit intégrer",
    icon: "eyeSpirit",
    sessions: [
      {
        num: "2.1",
        title: "Le monde invisible gouverne le monde visible",
        points: [
          "Royaumes invisibles",
          "Entités territoriales",
          "Implications pour le dirigeant",
        ],
      },
      {
        num: "2.2",
        title: "Dieu élève et abaisse",
        points: [
          "Ne délègue ta destinée à personne",
          "La souveraineté de Dieu dans l'élévation",
        ],
      },
    ],
  },
  {
    num: "03",
    blocRoman: "I",
    blocNum: 1,
    title: "Les Bases de l'Élévation Divine (1)",
    theme: "Pourquoi Dieu élève ses dirigeants — Les 5 raisons fondamentales",
    icon: "arrowHeart",
    sessions: [
      {
        num: "3.1",
        title: "Dieu cherche des cœurs",
        points: [
          "Les critères du choix divin",
          "La loi de la distinction",
        ],
      },
      {
        num: "3.2",
        title: "Les 5 raisons pour lesquelles Dieu distingue",
        points: [
          "Accomplir ses buts",
          "Posséder les territoires",
          "Éclairer les nations",
          "Sauver des peuples",
          "Manifester sa gloire",
        ],
      },
    ],
  },
  {
    num: "04",
    blocRoman: "I",
    blocNum: 1,
    title: "Les Bases de l'Élévation Divine (2)",
    theme: "Comment Dieu appelle ses serviteurs — L'exemple de David",
    icon: "harp",
    sessions: [
      {
        num: "4.1",
        title: "Dieu appelle des serviteurs, pas des stars",
        points: [
          "Les 3 niveaux de service",
          "Le piège du statut",
        ],
      },
      {
        num: "4.2",
        title: "L'exemple de David — L'homme selon le cœur de Dieu",
        points: [
          "Amour, humilité, fidélité",
          "L'onction au cœur, pas à l'apparence",
        ],
      },
    ],
  },
  {
    num: "05",
    blocRoman: "II",
    blocNum: 2,
    title: "Marcher avec le Saint-Esprit",
    theme: "Exigence N°1 — La première et principale exigence de la royauté",
    icon: "dove",
    sessions: [
      {
        num: "5.1",
        title: "Recevoir et accueillir le Saint-Esprit",
        lead: "Son rôle :",
        points: [
          "Avantage",
          "Intercesseur",
          "Stratège",
          "Force intérieure en milieu hostile",
        ],
      },
      {
        num: "5.2",
        title: "Apprendre à marcher avec le Saint-Esprit",
        points: [
          "La loi de la solitude intentionnelle",
          "L'amour de la maison de Dieu",
        ],
      },
    ],
  },
  {
    num: "06",
    blocRoman: "II",
    blocNum: 2,
    title: "Protéger son Cœur",
    theme: "Exigence N°2 — Le plus grand danger et le plus grand atout du dirigeant",
    icon: "shieldHeart",
    sessions: [
      {
        num: "6.1",
        title: "Le cœur — Champ de bataille invisible",
        points: [
          "Portes d'entrée des impuretés",
          "La loi de l'élévation et de la tentation",
        ],
      },
      {
        num: "6.2",
        title: "Comment purifier et garder son cœur",
        points: [
          "La technologie du sang de Jésus",
          "Dispositions héritées et acquises",
        ],
      },
    ],
  },
  {
    num: "07",
    blocRoman: "II",
    blocNum: 2,
    title: "La Parole et les Déclarations",
    theme: "Exigence N°3 — La Parole de Dieu comme fondement et arme du dirigeant",
    icon: "scrollSound",
    sessions: [
      {
        num: "7.1",
        title: "Méditer la Parole de Dieu",
        points: [
          "Bien plus qu'une lecture",
          "Transformation intérieure, du cerveau au cœur",
        ],
      },
      {
        num: "7.2",
        title: "Déclarer la Parole",
        lead: "Le pouvoir des confessions et décrets :",
        points: [
          "Activer les anges",
          "Changer les atmosphères",
        ],
      },
    ],
  },
  {
    num: "08",
    blocRoman: "II",
    blocNum: 2,
    title: "Foi, Persévérance et Puissance",
    theme: "Exigence N°4 — Tenir debout sous la pression",
    icon: "mountainAnchor",
    sessions: [
      {
        num: "8.1",
        title: "Développer une foi inébranlable",
        lead: "Les ennemis de la foi — exemples bibliques :",
        points: [
          "Moïse",
          "Les 3 Hébreux",
          "Daniel",
        ],
      },
      {
        num: "8.2",
        title: "Persévérer dans les épreuves",
        points: [
          "La traversée est obligatoire",
          "Marcher dans la puissance spirituelle",
        ],
      },
    ],
  },
  {
    num: "09",
    blocRoman: "III",
    blocNum: 3,
    title: "Vision, Sagesse et Conseil",
    theme: "Exigence N°5 — Gouverner avec l'intelligence divine",
    icon: "compass",
    sessions: [
      {
        num: "9.1",
        title: "Avoir une vision claire",
        lead: "La loi de la vision :",
        points: [
          "Comment la recevoir",
          "L'écrire",
          "La communiquer",
          "La revisiter",
        ],
      },
      {
        num: "9.2",
        title: "Rechercher la sagesse et le conseil",
        lead: "La loi du conseil :",
        points: [
          "Où trouver le conseil",
          "Humilité de l'apprentissage continu",
        ],
      },
    ],
  },
  {
    num: "10",
    blocRoman: "III",
    blocNum: 3,
    title: "Choisir ses Collaborateurs",
    theme: "Exigence N°6 — L'art de s'entourer selon les critères de Dieu",
    icon: "team",
    sessions: [
      {
        num: "10.1",
        title: "Les critères divins pour choisir son équipe",
        lead: "Les 4 critères de Jéthro :",
        points: [
          "Capables",
          "Craignant Dieu",
          "Intègres",
          "Ennemis de la cupidité",
        ],
      },
      {
        num: "10.2",
        title: "Gérer les trahisons et les oppositions internes",
        lead: "Armes spirituelles :",
        points: [
          "Prière",
          "Sang",
          "Discrétion",
          "Fidélité dans l'excellence",
        ],
      },
    ],
  },
  {
    num: "11",
    blocRoman: "IV",
    blocNum: 4,
    title: "La Gestion de la Gloire (1)",
    theme: "Gérer l'argent, les honneurs et les relations",
    icon: "scale",
    sessions: [
      {
        num: "11.1",
        title: "Gérer l'argent dans la royauté",
        points: [
          "Les pièges de la prospérité",
          "La loi du pipeline",
          "Discernement entre autorisé et interdit",
        ],
      },
      {
        num: "11.2",
        title: "Gérer les honneurs, le sexe opposé et les fêtes",
        points: [
          "Rediriger la gloire",
          "Protection intentionnelle",
          "Vigilance dans les voyages",
        ],
      },
    ],
  },
  {
    num: "12",
    blocRoman: "IV",
    blocNum: 4,
    title: "La Gestion de la Gloire (2)",
    theme: "Fidélité, humilité et durabilité de la royauté",
    icon: "columnRoots",
    sessions: [
      {
        num: "12.1",
        title: "La fidélité — La clé de l'élévation et du maintien",
        points: [
          "Fidèle dans les petites choses",
          "Supérieure au talent",
          "Dieu teste avant d'élever",
        ],
      },
      {
        num: "12.2",
        title: "L'humilité — La racine de toutes les grâces",
        points: [
          "Savoir d'où vient l'élévation",
          "Chutes documentées (Saül, Nébucadnetsar)",
          "Comment maintenir l'humilité",
        ],
      },
    ],
  },
];
