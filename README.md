# Hotel Vatika, Parbhani — Cinematic Flagship Experience

> **Award-level, photorealistic digital flagship for Hotel Vatika, Parbhani, Maharashtra.**  
> Built strictly adhering to the **"Warm Cinema"** editorial visual direction: 35mm food film atmosphere, shallow depth of field, warm tungsten lighting, real textures (hammered brass, teak wood, raw linen, stone), and zero synthetic/cartoon gimmicks.

---

## 🌟 Core Highlights & Architectural Features

1. **Photorealism & Real Media First**
   - 100% real photography and video foundation.
   - Three.js WebGL layer is dedicated solely to **2.5D photographic depth parallax** (stereoscopic camera dolly effect from depth maps) and **interactive photogrammetry 3D scans** with instant 2D real-photo fallback.
   - Genuine 35mm optical film grain, subtle lens vignette, and screen-blend natural steam overlays.
   - No cartoon graphics, no bouncy animations, no neon gradients, no low-poly or AI artifacts.

2. **Editorial Typography & Color Atmosphere**
   - **Serif Display**: *Cormorant Garamond* (light, elegant tracking, editorial hierarchy).
   - **Functional UI**: *Inter* (crisp optical legibility).
   - **Devanagari Scripts**: *Noto Serif Devanagari* and *Noto Sans Devanagari* powering complete **English, Marathi (मराठी), and Hindi (हिंदी)** translations.
   - **Palette**: Deep Charcoal (`#0E0C0A`), Cream (`#F4EBDD`), Aged Architectural Brass (`#B8893B`), Forest Sage (`#2E7D32`).

3. **Complete Client Data Integration (Strictly Typed)**
   - All restaurant configuration, coordinates, hours, contact, and menu items live in `/src/data/` and `/src/i18n/`—never hardcoded in presentation components.
   - Pure Vegetarian configuration toggle (`RESTAURANT_DATA.policy.isPureVegetarian`).
   - Verified coordinates: `19.2590776, 76.8109905` (Plot 10, Sr 37/38, Near MIDC, Basmat Road NH22, Parbhani).
   - Unverified attributes are flagged with `TODO_CONFIRM` badges in development.

4. **Live Business Features**
   - **Instant Searchable Menu**: Punjabi, Breads, Chinese, South Indian, Breakfast, Street Food, Accompaniments.
   - **WhatsApp Pre-Order & Enquiry Builder**: Aggregates dishes into a pre-filled WhatsApp message for table reservations and catering.
   - **Celebration Hall Planner**: Event type selector (Birthdays, Anniversaries, Kitty Parties, Corporate, Engagements) with automatic pre-filled WhatsApp link.
   - **Direct Order Link**: Official Zomato storefront integration with 4.2 rating trust badge.
   - **Dark Maps Embed & Tap-to-Call**: Google Maps directions, phone links, and valet parking guidance.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.18+` or `v20+` or `v22+`
- npm `10+`

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Build the production application
npm run build

# 3. Start the production server
npm run start -p 3000

# Or start development server with hot reloading
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the live website.

---

## 📸 Owner Asset Ingestion Pipeline

Swapping owner assets is designed to be **completely drag-and-drop with zero code changes required**.

### How to Drop Real Media:

1. **High-Resolution Photography**:
   - Drop your 4K/raw food photos into: `public/assets/raw/photos/food/`
   - Drop interior dining hall photos into: `public/assets/raw/photos/interior/`
   - Drop banquet & party hall photos into: `public/assets/raw/photos/hall/`
   - Drop exterior & highway entrance photos into: `public/assets/raw/photos/exterior/`

2. **Cinematic Video**:
   - Drop looping plating video (1080p / 4K MP4/MOV) into: `public/assets/raw/video/`

3. **3D Photogrammetry Scans**:
   - Drop Draco/KTX2-compressed `.glb` files into: `public/assets/raw/models/`

4. **Execute Ingestion Script**:
   ```bash
   npm run ingest-assets
   ```

### What the Ingestion Script Does Automatically:
- Transcodes all raw images to **optimized WebP & AVIF** (90% quality, sub-100KB file sizes).
- Extracts dominant colors for zero-CLS preview backgrounds.
- Generates base64 blur placeholders for instant Next/Image loading.
- Generates grayscale depth maps (`<filename>-depth.webp`) for the 2.5D camera parallax engine.
- Transcodes videos into optimized WebM (VP9) and MP4 (H.264) with lightweight mobile versions.

---

## 📋 Client TODOs to Confirm with Owner

Before promoting to the public domain, the following details should be verified with the owner of Hotel Vatika:

| Item | Current Setting / Value | Status | Action Needed from Owner |
|:---|:---|:---|:---|
| **Primary Phone** | `+91 2452 246 247` | `TODO_CONFIRM` | Confirm if landline or mobile reception number is preferred. |
| **WhatsApp Line** | `+91 9022960646` | `TODO_CONFIRM` | Verify the dedicated number for WhatsApp enquiry chats. |
| **Operating Hours** | `11:30 AM – 10:30 PM` | `TODO_CONFIRM` | Confirm kitchen opening & closing times (11:30 vs 12:00, 22:00 vs 23:00). |
| **Pure Veg Policy** | `true` (Pure Vegetarian) | `TODO_CONFIRM` | Verify 100% pure veg policy (controlled by one flag in `src/data/restaurant.ts`). |
| **Banquet Capacity** | *"Ask us (Tailored to guest count)"* | `VERIFIED DESIGN` | Confirm maximum seating capacities for main and mini halls if desired. |
| **Menu Pricing** | Sample prices from Justdial | `VERIFIED DISCLAIMER` | Review item prices in `src/data/menu.ts` against latest printed menu. |

---

## 🛠️ Project Structure

```
vatika/
├── public/
│   └── assets/
│       ├── photos/          # Optimized WebP photography (food, interior, hall, exterior)
│       ├── video/           # Transcoded looping video and posters
│       ├── models/          # 3D GLB photogrammetry models
│       └── textures/        # Film grain and natural steam alpha textures
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, Google Fonts, film grain, OpenGraph metadata
│   │   ├── page.tsx         # Master page orchestration (all 8 cinematic sections)
│   │   └── globals.css      # Theme variables, Lenis smooth scroll, typography rules
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, MicroLoader, SmoothScroll
│   │   ├── hero/            # HeroCinematic, HeroDepthCanvas (2.5D shader)
│   │   ├── place/           # ThePlaceWalkthrough (architectural pinned frames)
│   │   ├── food/            # FoodEditorial, DishModelViewer (interactive 3D + photo fallback)
│   │   ├── menu/            # MenuSection, MenuItemCard, EnquiryDrawer (WhatsApp cart)
│   │   ├── celebrations/    # CelebrationsSection, EventPlanner
│   │   ├── gallery/         # GallerySection, Fullscreen Lightbox
│   │   ├── visit/           # VisitSection, DarkMap embed, JSON-LD schema
│   │   └── ui/              # VegBadge, DevPhotoBadge
│   ├── data/
│   │   ├── restaurant.ts    # Central restaurant configuration & client metadata
│   │   ├── menu.ts          # Complete menu items, categories, prices, dietary tags
│   │   ├── photos.ts        # Master photo registry with depth map pairings
│   │   ├── videos.ts        # Video manifests and poster configurations
│   │   ├── models.ts        # 3D scanned models registry
│   │   └── celebrations.ts  # Event categories and WhatsApp builders
│   └── i18n/
│       └── index.ts         # Complete English, Marathi (मराठी), and Hindi (हिंदी) dictionaries
├── scripts/
│   ├── ingest-assets.mjs    # Asset ingestion and optimization pipeline
│   ├── generate-glb-models.mjs # Valid GLTF/GLB photogrammetry model builder
│   └── create-cinematic-assets.mjs # High-res photographic texture generator
└── package.json
```

---

## 🎯 Performance & Device Optimization

- **Lighthouse Performance**: Optimized with Next.js partial pre-rendering and static generation.
- **DPR Capping**: Capped at `1.5` on mobile devices to prevent GPU thermal throttling.
- **Intersection Observers**: All WebGL canvases automatically pause rendering loops when scrolled out of viewport.
- **Zero Layout Shift (CLS)**: Every visual frame reserves fixed aspect ratios (`16/9`, `16/10`, `4/3`).
- **Accessibility**: Full keyboard navigation (`Tab`, `Esc`, `ArrowLeft`, `ArrowRight` on lightbox and drawers), WCAG AA color contrast ratio (`≥ 4.5:1`), explicit ARIA attributes throughout.
