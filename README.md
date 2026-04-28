# 🌊 Hiroto — Game Developer & Resonator Portfolio

A premium dark cyber-fantasy portfolio website inspired by **Wuthering Waves** and **Phrolova** (Havoc Resonator). Built with Next.js 14, Three.js, Framer Motion, GSAP, and Tailwind CSS.

---

## ✨ Features

- **Full-screen hero** with video/image background and interactive 3D card
- **360° rotatable Phrolova card** powered by Three.js — drag to rotate, auto-spins, holographic shine, particles
- **Click to flip** the card to reveal developer info
- **Animated footer** with blooming flower, frequency wave particles, and Outcrowd.io-inspired layout
- **5 sections**: Home, About, Projects, Skills, Contact
- **Game-style skill bars** with animated level indicators
- **Custom cursor glow**, noise overlay, glass morphism, frequency animations
- **Fully responsive** and mobile-friendly
- **Dark mode only** — cinematic and immersive

---

## 🛠️ Tech Stack

| Technology       | Purpose                           |
|-----------------|-----------------------------------|
| Next.js 14      | App Router, SSR, file-based routing |
| React 18        | UI components                     |
| TypeScript      | Type safety                       |
| Tailwind CSS    | Utility-first styling             |
| Three.js        | 3D card rendering                 |
| @react-three/fiber | React Three.js integration     |
| @react-three/drei | Three.js helpers (OrbitControls, Float) |
| Framer Motion   | Page animations, scroll reveals   |
| GSAP            | Advanced scroll animations, magnetic effects |

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd hiroto-portfolio
npm install
```

### 2. Add your assets

Place your images/video in `/public/assets/`:

| File | Description | Recommended Size |
|------|-------------|-----------------|
| `phrolova-bg.mp4` | Hero background video (looping) | 1920×1080 |
| `phrolova-bg.jpg` | Hero fallback image / video poster | 1920×1080 |
| `phrolova-card-front.png` | Front of the 3D card | 600×900, PNG with transparency |
| `phrolova-card-back.png` | Back of the card (dev info) | 600×900, PNG with transparency |
| `phrolova-flower.png` | Flower for footer animation | 500×500, PNG with transparency |
| `projects/*.jpg` | Project screenshots | 800×600 |

> **Note:** Placeholder SVGs are included so the site works without assets. Replace them with your actual images for the full experience.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
hiroto-portfolio/
├── public/
│   └── assets/
│       ├── phrolova-bg.mp4          ← Hero background video
│       ├── phrolova-bg.jpg          ← Hero fallback image
│       ├── phrolova-card-front.png  ← 3D card front
│       ├── phrolova-card-back.png   ← 3D card back
│       ├── phrolova-flower.png      ← Footer flower
│       └── projects/                ← Project screenshots
├── src/
│   ├── app/
│   │   ├── globals.css              ← Global styles, animations, effects
│   │   ├── layout.tsx               ← Root layout with metadata
│   │   └── page.tsx                 ← Main page (composes all sections)
│   ├── components/
│   │   ├── Navbar.tsx               ← Fixed nav with glass effect
│   │   ├── Hero.tsx                 ← Full-screen hero with 3D card
│   │   ├── PhrolovaCard.tsx         ← Three.js interactive 360° card
│   │   ├── About.tsx                ← Developer story + WuWa lore
│   │   ├── Projects.tsx             ← Project showcase grid
│   │   ├── Skills.tsx               ← Game-style skill tree
│   │   ├── Contact.tsx              ← Glass contact form
│   │   ├── Footer.tsx               ← Animated flower footer
│   │   ├── CursorGlow.tsx           ← Custom cursor glow
│   │   └── SectionDivider.tsx       ← Gradient section dividers
│   └── lib/
│       └── animations.ts           ← GSAP hooks (reveal, stagger, magnetic)
├── tailwind.config.js               ← Custom Phrolova colour palette
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🎨 Customisation Guide

### Colours
Edit `tailwind.config.js` to change the palette:
- `void` — Deepest black background
- `abyss` — Dark section backgrounds
- `phantom` — Card/element backgrounds
- `havoc` — Deep purple accent
- `crimson` — Primary accent (Phrolova's red)
- `orchid` — Secondary accent (purple)
- `silver` — Text and UI elements

### Content
- **About section** → `src/components/About.tsx` (edit bio, stats, quick info)
- **Projects** → `src/components/Projects.tsx` (edit PROJECTS array)
- **Skills** → `src/components/Skills.tsx` (edit SKILL_CATEGORIES)
- **Contact email** → `src/components/Contact.tsx` (search for `hiroto@example.com`)
- **Social links** → `src/components/Footer.tsx` (edit SOCIALS array)

### Contact Form
The form currently logs to console. To make it functional:
1. Install an email service (Resend, EmailJS, SendGrid)
2. Create an API route at `src/app/api/contact/route.ts`
3. Update the `handleSubmit` function in `Contact.tsx`

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📝 Credits

- **Design inspiration**: [Outcrowd.io](https://www.outcrowd.io), Wuthering Waves UI
- **Character inspiration**: Phrolova, Havoc Resonator — Wuthering Waves by Kuro Games
- **Built by**: Hiroto 🇲🇳

---

*"In the silence between frequencies, creation happens."* — Hiroto
