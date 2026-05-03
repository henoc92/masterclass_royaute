# Masterclass Royauté — Site

Site web single-page de présentation de la **Masterclass Royauté**, formation chrétienne de leadership en 12 modules. *« Impacter et diriger en milieu hostile. »*

Référence visuelle : bennet.clapat.com — adapté avec touche art direction (croix coins, compteur cinématique, numérotation chapitres).

---

## Stack

- **Next.js 16** (App Router + Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (config dans `globals.css` via `@theme`, pas de `tailwind.config.js`)
- **Framer Motion 12** — animations, transitions, parallax
- **GSAP** + **Lenis** (installés, prêts à l'emploi pour évolutions)
- **Polices** : Fraunces (display, italique) + Inter (body), via `next/font`

## Direction artistique

| Token | Couleur |
|---|---|
| `--color-paper` | `#FAFAF7` — fond blanc cassé |
| `--color-ink` | `#0A1628` — marine profond, texte + rideaux |
| `--color-gold` | `#C9A84C` — accent or, parcimonieux |
| `--color-mute` | `#3A4A5C` — marine désaturé, texte secondaire |

Aucune autre couleur. Mode clair uniquement (site éditorial, voir CdC).

## Structure du site — 6 slides

| # | Slide | Description |
|---|---|---|
| 01 | Hero | `Royauté.` lettre par lettre, citation discrète |
| 02 | La promesse | Phrase centrale unique, mention auteur |
| 03 | Le parcours | 4 blocs (I–IV) avec carrousel interne |
| 04 | Le programme | 12 modules : liste gauche + détail droite (desktop), accordion (mobile) |
| 05 | Le format | 3 compteurs animés (12 / 24 / ~12h) |
| 06 | Rejoindre | Email capture + footer minimal |

**Navigation :**
- **Desktop** : scroll horizontal slide par slide (wheel/keyboard intercepté), throttle 850ms, transition rideau marine
- **Mobile** : scroll vertical natif avec snap CSS, IntersectionObserver pour activer les anims

## Lancement

```bash
npm install
npm run dev   # http://localhost:3000 par défaut, ou PORT=3006 npm run dev
```

## Build & déploiement

```bash
npm run build
npm run start   # serveur prod local
```

Déploiement cible : **Vercel** (push sur la branche main → auto-deploy).

## Variables d'environnement

V1 : aucune obligatoire. L'endpoint `/api/subscribe` log les leads en console.
À brancher en prod :

```
RESEND_API_KEY=...        # ou MAILCHIMP_API_KEY
EMAIL_FROM=contact@masterclass-royaute.com
EMAIL_LIST_ID=...
```

## Structure des dossiers

```
masterclass_royaute_website/
├── app/
│   ├── layout.tsx            # polices, metadata SEO + OG
│   ├── page.tsx              # entry + JSON-LD Course
│   ├── globals.css           # tokens CSS @theme + base
│   └── api/subscribe/route.ts
├── components/
│   ├── PageRoot.tsx          # orchestrateur preloader + nav + indicateurs
│   ├── Preloader.tsx         # compteur 0→100 + rideau qui se lève
│   ├── CustomCursor.tsx      # curseur 12px desktop only
│   ├── Header.tsx            # logo + 01—02—03 + burger + overlay menu
│   ├── slides/               # 6 slides composants
│   ├── nav/                  # DesktopSlides + MobileStack
│   └── ui/                   # AnimatedText, Counter, Eyebrow, HoverLink, CornerCross
└── lib/
    ├── data/                 # modules.ts (12 + 24 sessions), blocs.ts (4)
    └── hooks/useSlideNavigation.ts
```

## Performance attendue (cibles CdC)

- Lighthouse Performance ≥ 90
- LCP < 2.5s
- CLS < 0.05
- Polices : `font-display: swap`
- Images : aucune en V1 (la typographie EST le hero)

## SEO

- Meta title + description fr_FR
- Open Graph + Twitter Card
- Schema.org `Course` injecté en JSON-LD
- `<h1>` unique sur Hero, hiérarchie respectée

## Évolutions à prévoir post-V1

- Branchement Resend (ou Mailchimp) pour `/api/subscribe`
- OG image générée (1200×630) à mettre dans `public/og.jpg`
- Sitemap.xml + robots.txt si besoin
- Tests Lighthouse sur prod
- Vérification curseur custom + smooth scroll cross-browser (Safari, Firefox)
