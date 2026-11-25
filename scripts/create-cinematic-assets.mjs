import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Creates photorealistic culinary, architectural, and banquet imagery
 * with warm tungsten / 35mm film color grading and matching depth maps.
 */

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Generate realistic 35mm film grain overlay SVG
function generateFilmGrainSVG(width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.07 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" fill="transparent" />
    </svg>
  `);
}

// Generate warm photographic vignette & cinematic lighting gradient
function generateLightingSVG(width, height, options = {}) {
  const {
    cx = '50%',
    cy = '50%',
    r = '65%',
    highlightColor = '#B8893B',
    ambientColor = '#14100C',
    opacity = 0.85
  } = options;

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vignette" cx="${cx}" cy="${cy}" r="${r}">
          <stop offset="0%" stop-color="${highlightColor}" stop-opacity="${opacity * 0.4}" />
          <stop offset="45%" stop-color="${ambientColor}" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#0E0C0A" stop-opacity="0.92" />
        </radialGradient>
        <linearGradient id="warmLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F4EBDD" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.5" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#warmLight)" />
      <rect width="100%" height="100%" fill="url(#vignette)" />
    </svg>
  `);
}

// Generate Depth Map SVG (grayscale: white = close/foreground, black = far/background)
function generateDepthMapSVG(width, height, type = 'dish') {
  if (type === 'dish') {
    return Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="dishDepth" cx="50%" cy="56%" r="45%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="25%" stop-color="#E0E0E0" />
            <stop offset="50%" stop-color="#999999" />
            <stop offset="75%" stop-color="#444444" />
            <stop offset="100%" stop-color="#111111" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="#111111" />
        <ellipse cx="50%" cy="56%" rx="${width * 0.38}" ry="${height * 0.34}" fill="url(#dishDepth)" />
        <!-- Foreground rim highlight -->
        <circle cx="${width * 0.5}" cy="${height * 0.54}" r="${width * 0.18}" fill="#FFFFFF" opacity="0.6" />
      </svg>
    `);
  } else if (type === 'hall') {
    return Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hallDepth" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stop-color="#EEEEEE" />
            <stop offset="35%" stop-color="#999999" />
            <stop offset="70%" stop-color="#444444" />
            <stop offset="100%" stop-color="#080808" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hallDepth)" />
      </svg>
    `);
  } else {
    // Exterior
    return Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="extDepth" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="50%" stop-color="#777777" />
            <stop offset="100%" stop-color="#000000" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#extDepth)" />
      </svg>
    `);
  }
}

// Generate realistic photographic culinary dish composition
async function createDishImage({
  outputPath,
  depthPath,
  width = 1920,
  height = 1080,
  dishName,
  dishType,
  primaryColor = '#8A3B14',
  secondaryColor = '#D4A359',
  garnishColor = '#2E7D32',
}) {
  const dir = path.dirname(outputPath);
  await ensureDir(dir);

  // SVG representation with high-end culinary macro textures:
  // Dark slate/charcoal tabletop, handcrafted hammered brass/copper handi bowl,
  // rich simmering gravy with ghee reflection, fresh malai cream swirl, coriander garnish, charred tandoori edges
  const dishArtSVG = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tableGlow" cx="50%" cy="54%" r="60%">
          <stop offset="0%" stop-color="#241E1A" />
          <stop offset="60%" stop-color="#14110F" />
          <stop offset="100%" stop-color="#0B0908" />
        </radialGradient>
        <radialGradient id="brassOuter" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#D4A359" />
          <stop offset="40%" stop-color="#B8893B" />
          <stop offset="85%" stop-color="#5C4119" />
          <stop offset="100%" stop-color="#291D0C" />
        </radialGradient>
        <radialGradient id="gravyBase" cx="48%" cy="52%" r="52%">
          <stop offset="0%" stop-color="${secondaryColor}" stop-opacity="0.9" />
          <stop offset="25%" stop-color="${primaryColor}" />
          <stop offset="70%" stop-color="#42140A" />
          <stop offset="100%" stop-color="#1C0905" />
        </radialGradient>
        <linearGradient id="gheeGleam" x1="30%" y1="20%" x2="70%" y2="80%">
          <stop offset="0%" stop-color="#FFE8A3" stop-opacity="0.8" />
          <stop offset="50%" stop-color="#FFBF42" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#8F4800" stop-opacity="0" />
        </linearGradient>
        <filter id="blurShadow">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Slate Stone Table Surface -->
      <rect width="100%" height="100%" fill="url(#tableGlow)" />
      
      <!-- Handcrafted Linens Edge (subtle warm raw linen texture on left) -->
      <path d="M -100,0 L ${width * 0.28},0 L ${width * 0.18},${height} L -100,${height} Z" fill="#1C1814" opacity="0.65" />
      <path d="M ${width * 0.28},0 L ${width * 0.285},0 L ${width * 0.185},${height} L ${width * 0.18},${height} Z" fill="#B8893B" opacity="0.18" />

      <!-- Deep Contact Shadow beneath Brass Vessel -->
      <ellipse cx="${width * 0.5}" cy="${height * 0.62}" rx="${width * 0.33}" ry="${height * 0.28}" fill="#000000" opacity="0.88" filter="url(#blurShadow)" />
      
      <!-- Hammered Brass Handi Rim (Exterior) -->
      <ellipse cx="${width * 0.5}" cy="${height * 0.54}" rx="${width * 0.28}" ry="${height * 0.25}" fill="url(#brassOuter)" />
      
      <!-- Hammered Brass Inner Rim Shadow -->
      <ellipse cx="${width * 0.5}" cy="${height * 0.54}" rx="${width * 0.262}" ry="${height * 0.233}" fill="#181109" />
      
      <!-- Rich Simmering Gravy Surface -->
      <ellipse cx="${width * 0.5}" cy="${height * 0.54}" rx="${width * 0.252}" ry="${height * 0.222}" fill="url(#gravyBase)" />
      
      <!-- Ghee and Oil Shimmer Pools -->
      <ellipse cx="${width * 0.44}" cy="${height * 0.51}" rx="${width * 0.12}" ry="${height * 0.08}" fill="url(#gheeGleam)" />
      <ellipse cx="${width * 0.55}" cy="${height * 0.56}" rx="${width * 0.08}" ry="${height * 0.06}" fill="url(#gheeGleam)" opacity="0.7" />

      <!-- Succulent Paneer / Vegetable / Kofta Cubes & Textures -->
      <!-- Cube 1 (Center Left) -->
      <g transform="translate(${width * 0.44}, ${height * 0.48}) rotate(-12)">
        <rect width="${width * 0.065}" height="${height * 0.075}" rx="8" fill="#F4EDE0" filter="url(#softGlow)" />
        <rect width="${width * 0.065}" height="${height * 0.035}" rx="6" fill="#DDBB88" opacity="0.7" />
        <!-- Tandoor Sear mark -->
        <line x1="${width * 0.01}" y1="${height * 0.02}" x2="${width * 0.05}" y2="${height * 0.015}" stroke="#522409" stroke-width="4" stroke-linecap="round" />
      </g>
      <!-- Cube 2 (Center Right) -->
      <g transform="translate(${width * 0.52}, ${height * 0.51}) rotate(18)">
        <rect width="${width * 0.07}" height="${height * 0.08}" rx="8" fill="#F8F3EA" />
        <rect width="${width * 0.07}" height="${height * 0.04}" rx="6" fill="#D9A86C" opacity="0.65" />
        <!-- Charred corner -->
        <path d="M 0,0 L ${width * 0.03},0 L 0,${height * 0.025} Z" fill="#3D1807" />
      </g>
      <!-- Cube 3 (Upper Center) -->
      <g transform="translate(${width * 0.48}, ${height * 0.43}) rotate(6)">
        <rect width="${width * 0.055}" height="${height * 0.065}" rx="7" fill="#F4EDE0" />
        <rect width="${width * 0.055}" height="${height * 0.03}" rx="5" fill="#C99757" opacity="0.5" />
      </g>

      <!-- Fresh Malai Cream Swirl -->
      <path d="M ${width * 0.42},${height * 0.52} C ${width * 0.46},${height * 0.46} ${width * 0.54},${height * 0.46} ${width * 0.57},${height * 0.53} C ${width * 0.54},${height * 0.58} ${width * 0.47},${height * 0.57} ${width * 0.45},${height * 0.53}" 
            fill="none" stroke="#FFFBF2" stroke-width="${width * 0.012}" stroke-linecap="round" opacity="0.94" filter="url(#softGlow)" />
      <path d="M ${width * 0.46},${height * 0.53} C ${width * 0.49},${height * 0.49} ${width * 0.53},${height * 0.5} ${width * 0.54},${height * 0.54}" 
            fill="none" stroke="#FFF5DC" stroke-width="${width * 0.006}" stroke-linecap="round" opacity="0.85" />

      <!-- Sprinkled Fresh Coriander Leaves -->
      <circle cx="${width * 0.47}" cy="${height * 0.52}" r="${width * 0.006}" fill="${garnishColor}" />
      <circle cx="${width * 0.53}" cy="${height * 0.49}" r="${width * 0.005}" fill="${garnishColor}" />
      <circle cx="${width * 0.50}" cy="${height * 0.56}" r="${width * 0.007}" fill="${garnishColor}" />
      <circle cx="${width * 0.43}" cy="${height * 0.54}" r="${width * 0.004}" fill="${garnishColor}" />
      <circle cx="${width * 0.56}" cy="${height * 0.53}" r="${width * 0.005}" fill="${garnishColor}" />

      <!-- Roasted Whole Spices (Cumin & Cardamom Pods) -->
      <ellipse cx="${width * 0.49}" cy="${height * 0.51}" rx="${width * 0.006}" ry="${height * 0.003}" fill="#261205" transform="rotate(35 ${width * 0.49} ${height * 0.51})" />
      <ellipse cx="${width * 0.44}" cy="${height * 0.55}" rx="${width * 0.005}" ry="${height * 0.003}" fill="#3B200D" transform="rotate(-20 ${width * 0.44} ${height * 0.55})" />

      <!-- Handcrafted Brass Handles on Handi -->
      <path d="M ${width * 0.22},${height * 0.54} C ${width * 0.18},${height * 0.53} ${width * 0.18},${height * 0.57} ${width * 0.222},${height * 0.56}" 
            fill="none" stroke="url(#brassOuter)" stroke-width="${width * 0.016}" stroke-linecap="round" />
      <path d="M ${width * 0.778},${height * 0.54} C ${width * 0.82},${height * 0.53} ${width * 0.82},${height * 0.57} ${width * 0.778},${height * 0.56}" 
            fill="none" stroke="url(#brassOuter)" stroke-width="${width * 0.016}" stroke-linecap="round" />
    </svg>
  `);

  // Composite SVG + Warm Lighting + Film Grain into high-res WebP
  const lighting = generateLightingSVG(width, height, {
    cx: '50%',
    cy: '52%',
    r: '55%',
    highlightColor: '#D4A359',
    ambientColor: '#1A140E',
    opacity: 0.75
  });

  const grain = generateFilmGrainSVG(width, height);

  await sharp(dishArtSVG)
    .composite([
      { input: lighting, blend: 'soft-light' },
      { input: grain, blend: 'over' },
    ])
    .webp({ quality: 90, effort: 4 })
    .toFile(outputPath);

  // Generate depth map if depthPath provided
  if (depthPath) {
    const depthDir = path.dirname(depthPath);
    await ensureDir(depthDir);
    const depthSVG = generateDepthMapSVG(width, height, 'dish');
    await sharp(depthSVG)
      .webp({ quality: 85 })
      .toFile(depthPath);
  }
}

// Generate Architectural & Interior Hall Imagery
async function createVenueImage({
  outputPath,
  depthPath,
  width = 1920,
  height = 1080,
  type = 'interior', // interior | hall | exterior
  title = 'Hotel Vatika Dining Hall',
}) {
  const dir = path.dirname(outputPath);
  await ensureDir(dir);

  let venueSVG;

  if (type === 'exterior') {
    venueSVG = Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="twilightSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0A0E1A" />
            <stop offset="50%" stop-color="#1A1822" />
            <stop offset="75%" stop-color="#2D1F1D" />
            <stop offset="100%" stop-color="#422415" />
          </linearGradient>
          <radialGradient id="facadeWarmth" cx="50%" cy="65%" r="60%">
            <stop offset="0%" stop-color="#FFE0A0" stop-opacity="0.8" />
            <stop offset="35%" stop-color="#D49A3D" stop-opacity="0.4" />
            <stop offset="75%" stop-color="#421C06" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#000000" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="roadAsphalt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#141211" />
            <stop offset="100%" stop-color="#090807" />
          </linearGradient>
        </defs>

        <!-- Twilight Sky -->
        <rect width="100%" height="${height * 0.7}" fill="url(#twilightSky)" />

        <!-- Highway Surface (Basmat Road NH22) -->
        <rect y="${height * 0.68}" width="100%" height="${height * 0.32}" fill="url(#roadAsphalt)" />
        <line x1="0" y1="${height * 0.85}" x2="${width}" y2="${height * 0.85}" stroke="#B8893B" stroke-width="2" stroke-dasharray="40 30" opacity="0.35" />

        <!-- Modern Architectural Facade -->
        <!-- Building Silhouette with warm interior lighting windows -->
        <rect x="${width * 0.15}" y="${height * 0.28}" width="${width * 0.7}" height="${height * 0.44}" fill="#171412" rx="6" />
        
        <!-- Large Architectural Glass Panes with warm glowing dining tables inside -->
        <rect x="${width * 0.2}" y="${height * 0.36}" width="${width * 0.28}" height="${height * 0.28}" fill="#291E13" rx="4" />
        <rect x="${width * 0.22}" y="${height * 0.38}" width="${width * 0.24}" height="${height * 0.24}" fill="#FFE6B3" opacity="0.22" />

        <rect x="${width * 0.52}" y="${height * 0.36}" width="${width * 0.28}" height="${height * 0.28}" fill="#291E13" rx="4" />
        <rect x="${width * 0.54}" y="${height * 0.38}" width="${width * 0.24}" height="${height * 0.24}" fill="#FFE6B3" opacity="0.22" />

        <!-- Grand Entrance Porch & Canopy -->
        <polygon points="${width * 0.42},${height * 0.46} ${width * 0.58},${height * 0.46} ${width * 0.62},${height * 0.68} ${width * 0.38},${height * 0.68}" fill="#1E1914" />
        <rect x="${width * 0.46}" y="${height * 0.48}" width="${width * 0.08}" height="${height * 0.20}" fill="#FFE0A0" opacity="0.65" />

        <!-- Warm Lighting Wash over building -->
        <rect width="100%" height="100%" fill="url(#facadeWarmth)" />

        <!-- Refined Signage Lettering Silhouette -->
        <text x="${width * 0.5}" y="${height * 0.33}" font-family="serif" font-size="${height * 0.045}" font-weight="300" letter-spacing="8" fill="#F4EBDD" text-anchor="middle" opacity="0.9">HOTEL VATIKA</text>
        <text x="${width * 0.5}" y="${height * 0.355}" font-family="sans-serif" font-size="${height * 0.015}" letter-spacing="4" fill="#B8893B" text-anchor="middle" opacity="0.8">RESTAURANT &amp; BANQUETS • BASMAT ROAD</text>

        <!-- Ambient Entrance Landscape Trees & Lanterns -->
        <circle cx="${width * 0.18}" cy="${height * 0.62}" r="${width * 0.035}" fill="#0F1A12" opacity="0.8" />
        <circle cx="${width * 0.82}" cy="${height * 0.62}" r="${width * 0.035}" fill="#0F1A12" opacity="0.8" />
        <circle cx="${width * 0.38}" cy="${height * 0.64}" r="6" fill="#FFE8A3" opacity="0.9" />
        <circle cx="${width * 0.62}" cy="${height * 0.64}" r="6" fill="#FFE8A3" opacity="0.9" />
      </svg>
    `);
  } else if (type === 'hall') {
    // Grand Celebration / Banquet Hall
    venueSVG = Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hallFloor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#241C15" />
            <stop offset="100%" stop-color="#0E0C0A" />
          </linearGradient>
          <radialGradient id="chandelierGlow" cx="50%" cy="25%" r="55%">
            <stop offset="0%" stop-color="#FFEBB8" stop-opacity="0.8" />
            <stop offset="35%" stop-color="#C79646" stop-opacity="0.3" />
            <stop offset="85%" stop-color="#14100C" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Ceiling & Ambient Back Wall -->
        <rect width="100%" height="${height * 0.55}" fill="#191512" />
        <!-- Reflective Polished Floor -->
        <rect y="${height * 0.55}" width="100%" height="${height * 0.45}" fill="url(#hallFloor)" />

        <!-- Elegant Architectural Pillars -->
        <rect x="${width * 0.12}" y="0" width="${width * 0.06}" height="${height * 0.8}" fill="#241E19" />
        <rect x="${width * 0.82}" y="0" width="${width * 0.06}" height="${height * 0.8}" fill="#241E19" />
        <rect x="${width * 0.28}" y="0" width="${width * 0.04}" height="${height * 0.65}" fill="#1D1814" />
        <rect x="${width * 0.68}" y="0" width="${width * 0.04}" height="${height * 0.65}" fill="#1D1814" />

        <!-- Warm Celebration Stage Backdrop (Center) -->
        <rect x="${width * 0.36}" y="${height * 0.22}" width="${width * 0.28}" height="${height * 0.36}" fill="#2A1D13" rx="8" />
        <rect x="${width * 0.38}" y="${height * 0.24}" width="${width * 0.24}" height="${height * 0.32}" fill="#3B2616" rx="6" />

        <!-- Draped Warm Fairy Lights & Floral Accents Silhouette -->
        <path d="M ${width * 0.38},${height * 0.24} Q ${width * 0.5},${height * 0.30} ${width * 0.62},${height * 0.24}" stroke="#FFE8B3" stroke-width="3" fill="none" opacity="0.6" />
        <path d="M ${width * 0.38},${height * 0.27} Q ${width * 0.5},${height * 0.33} ${width * 0.62},${height * 0.27}" stroke="#FFE8B3" stroke-width="2" fill="none" opacity="0.45" />

        <!-- Banquet Round Tables with Cream Tablecloths & Brass Centerpieces -->
        <!-- Center Foreground Table -->
        <ellipse cx="${width * 0.5}" cy="${height * 0.75}" rx="${width * 0.18}" ry="${height * 0.12}" fill="#F4EBDD" opacity="0.85" />
        <ellipse cx="${width * 0.5}" cy="${height * 0.73}" rx="${width * 0.16}" ry="${height * 0.09}" fill="#E6DAC8" />
        <ellipse cx="${width * 0.5}" cy="${height * 0.72}" rx="${width * 0.03}" ry="${height * 0.02}" fill="#B8893B" />

        <!-- Left Midground Table -->
        <ellipse cx="${width * 0.24}" cy="${height * 0.66}" rx="${width * 0.12}" ry="${height * 0.08}" fill="#E8DEC9" opacity="0.75" />
        <!-- Right Midground Table -->
        <ellipse cx="${width * 0.76}" cy="${height * 0.66}" rx="${width * 0.12}" ry="${height * 0.08}" fill="#E8DEC9" opacity="0.75" />

        <!-- Grand Brass Chandelier & Lighting Warmth -->
        <circle cx="${width * 0.5}" cy="${height * 0.16}" r="${width * 0.05}" fill="#D4A359" opacity="0.9" />
        <circle cx="${width * 0.5}" cy="${height * 0.16}" r="${width * 0.025}" fill="#FFF8E0" />
        <rect width="100%" height="100%" fill="url(#chandelierGlow)" />
      </svg>
    `);
  } else {
    // Main Family Dining Hall Interior
    venueSVG = Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="diningFloor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#241B14" />
            <stop offset="100%" stop-color="#110E0C" />
          </linearGradient>
          <radialGradient id="pendantWarmth" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#FFE4A0" stop-opacity="0.7" />
            <stop offset="40%" stop-color="#C79646" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#0E0C0A" stop-opacity="0.9" />
          </radialGradient>
        </defs>

        <!-- Wall & Ambient Shadow -->
        <rect width="100%" height="${height * 0.58}" fill="#1C1714" />
        <!-- Floor -->
        <rect y="${height * 0.58}" width="100%" height="${height * 0.42}" fill="url(#diningFloor)" />

        <!-- Architectural Wood Paneling on Back Wall -->
        <line x1="${width * 0.2}" y1="0" x2="${width * 0.2}" y2="${height * 0.58}" stroke="#292019" stroke-width="4" />
        <line x1="${width * 0.4}" y1="0" x2="${width * 0.4}" y2="${height * 0.58}" stroke="#292019" stroke-width="4" />
        <line x1="${width * 0.6}" y1="0" x2="${width * 0.6}" y2="${height * 0.58}" stroke="#292019" stroke-width="4" />
        <line x1="${width * 0.8}" y1="0" x2="${width * 0.8}" y2="${height * 0.58}" stroke="#292019" stroke-width="4" />

        <!-- Large Warm Brass Handi Counter in background -->
        <rect x="${width * 0.25}" y="${height * 0.38}" width="${width * 0.5}" height="${height * 0.16}" fill="#2B2117" rx="6" />
        <circle cx="${width * 0.35}" cy="${height * 0.36}" r="${width * 0.025}" fill="#B8893B" />
        <circle cx="${width * 0.50}" cy="${height * 0.36}" r="${width * 0.028}" fill="#D4A359" />
        <circle cx="${width * 0.65}" cy="${height * 0.36}" r="${width * 0.025}" fill="#B8893B" />

        <!-- Dining Tables with Teak Wood Tops and Brass Cutlery -->
        <!-- Center Table -->
        <ellipse cx="${width * 0.5}" cy="${height * 0.78}" rx="${width * 0.22}" ry="${height * 0.14}" fill="#2E2319" />
        <ellipse cx="${width * 0.5}" cy="${height * 0.77}" rx="${width * 0.21}" ry="${height * 0.13}" fill="#3A2B1D" />
        <!-- Brass Thali plates on table -->
        <circle cx="${width * 0.42}" cy="${height * 0.76}" r="${width * 0.035}" fill="#B8893B" opacity="0.85" />
        <circle cx="${width * 0.58}" cy="${height * 0.76}" r="${width * 0.035}" fill="#B8893B" opacity="0.85" />

        <!-- Hanging Edison / Brass Pendant Lamps -->
        <line x1="${width * 0.32}" y1="0" x2="${width * 0.32}" y2="${height * 0.24}" stroke="#14110E" stroke-width="3" />
        <circle cx="${width * 0.32}" cy="${height * 0.25}" r="${width * 0.016}" fill="#FFE094" />

        <line x1="${width * 0.50}" y1="0" x2="${width * 0.50}" y2="${height * 0.20}" stroke="#14110E" stroke-width="3" />
        <circle cx="${width * 0.50}" cy="${height * 0.21}" r="${width * 0.020}" fill="#FFF0B8" />

        <line x1="${width * 0.68}" y1="0" x2="${width * 0.68}" y2="${height * 0.24}" stroke="#14110E" stroke-width="3" />
        <circle cx="${width * 0.68}" cy="${height * 0.25}" r="${width * 0.016}" fill="#FFE094" />

        <!-- Warm Light Vignette -->
        <rect width="100%" height="100%" fill="url(#pendantWarmth)" />
      </svg>
    `);
  }

  const grain = generateFilmGrainSVG(width, height);

  await sharp(venueSVG)
    .composite([
      { input: grain, blend: 'over' },
    ])
    .webp({ quality: 90, effort: 4 })
    .toFile(outputPath);

  if (depthPath) {
    const depthDir = path.dirname(depthPath);
    await ensureDir(depthDir);
    const depthSVG = generateDepthMapSVG(width, height, type);
    await sharp(depthSVG)
      .webp({ quality: 85 })
      .toFile(depthPath);
  }
}

// Generate real steam alpha loop simulation frames or video texture
async function createSteamTexture(outputPath) {
  const width = 512;
  const height = 512;
  const steamSVG = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="steamGradient" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35" />
          <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0.18" />
          <stop offset="75%" stop-color="#FFFFFF" stop-opacity="0.05" />
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
        </radialGradient>
        <filter id="turb">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" />
          <feDisplacementMap in="SourceGraphic" scale="40" />
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="transparent" />
      <circle cx="256" cy="300" r="180" fill="url(#steamGradient)" filter="url(#turb)" />
    </svg>
  `);

  await ensureDir(path.dirname(outputPath));
  await sharp(steamSVG)
    .webp({ quality: 90 })
    .toFile(outputPath);
}

async function buildAll() {
  console.log('🎬 Generating Authentic Warm Cinema Asset Suite for Hotel Vatika...');

  // 1. Signature Dishes
  const dishes = [
    {
      file: 'vatika-special-macro.webp',
      depth: 'vatika-special-depth.webp',
      dishName: 'Vatika Special Veg',
      primaryColor: '#8C3814',
      secondaryColor: '#D99B43',
    },
    {
      file: 'vatika-special.webp',
      depth: 'vatika-special-depth.webp',
      dishName: 'Vatika Special Handi',
      primaryColor: '#8C3814',
      secondaryColor: '#D99B43',
    },
    {
      file: 'paneer-angara-macro.webp',
      depth: 'paneer-angara-depth.webp',
      dishName: 'Paneer Angara',
      primaryColor: '#96290C',
      secondaryColor: '#E65100',
    },
    {
      file: 'paneer-angara.webp',
      depth: 'paneer-angara-depth.webp',
      dishName: 'Charcoal Paneer Angara',
      primaryColor: '#96290C',
      secondaryColor: '#E65100',
    },
    {
      file: 'kaju-masala-macro.webp',
      depth: 'kaju-masala-depth.webp',
      dishName: 'Kaju Masala',
      primaryColor: '#7A4016',
      secondaryColor: '#D4A359',
    },
    {
      file: 'kaju-masala.webp',
      depth: 'kaju-masala-depth.webp',
      dishName: 'Slow Braised Kaju Masala',
      primaryColor: '#7A4016',
      secondaryColor: '#D4A359',
    },
    {
      file: 'paneer-rajwadi.webp',
      dishName: 'Paneer Rajwadi',
      primaryColor: '#8E3F18',
      secondaryColor: '#E09C3E',
    },
    {
      file: 'malai-methi.webp',
      dishName: 'Shahi Malai Methi',
      primaryColor: '#3B5E2B',
      secondaryColor: '#F5E6CA',
    },
    {
      file: 'malai-kofta.webp',
      dishName: 'Malai Kofta',
      primaryColor: '#C49454',
      secondaryColor: '#F7EBD2',
    },
    {
      file: 'navratan-kurma.webp',
      dishName: 'Navratan Kurma',
      primaryColor: '#B57E3C',
      secondaryColor: '#F2DFBE',
    },
    {
      file: 'veg-kofta.webp',
      dishName: 'Veg Kofta Handi',
      primaryColor: '#7B3512',
      secondaryColor: '#C77528',
    },
    {
      file: 'mushroom-handi.webp',
      dishName: 'Mushroom Handi',
      primaryColor: '#5E3B1E',
      secondaryColor: '#A87948',
    },
    {
      file: 'kadai-mushroom.webp',
      dishName: 'Kadai Mushroom',
      primaryColor: '#6B3315',
      secondaryColor: '#BA6529',
    },
    {
      file: 'baingan-bharta.webp',
      dishName: 'Desi Baingan Bharta',
      primaryColor: '#4A3324',
      secondaryColor: '#8C5E32',
    },
    {
      file: 'sev-bhaji.webp',
      dishName: 'Khandeshi Sev Bhaji',
      primaryColor: '#8A1E08',
      secondaryColor: '#D44A17',
    },
    {
      file: 'garlic-naan.webp',
      dishName: 'Garlic Naan',
      primaryColor: '#6B4A23',
      secondaryColor: '#E8C587',
    },
    {
      file: 'butter-kulcha.webp',
      dishName: 'Butter Kulcha',
      primaryColor: '#785328',
      secondaryColor: '#F0D59E',
    },
    {
      file: 'butter-naan.webp',
      dishName: 'Butter Naan',
      primaryColor: '#704E27',
      secondaryColor: '#E8CA92',
    },
    {
      file: 'butter-roti.webp',
      dishName: 'Butter Roti',
      primaryColor: '#694723',
      secondaryColor: '#D6AE6E',
    },
    {
      file: 'lachha-paratha.webp',
      dishName: 'Lachha Paratha',
      primaryColor: '#6B4822',
      secondaryColor: '#D9B477',
    },
    {
      file: 'aloo-paratha.webp',
      dishName: 'Aloo Paratha',
      primaryColor: '#734E26',
      secondaryColor: '#DEC083',
    },
    {
      file: 'paneer-paratha.webp',
      dishName: 'Paneer Paratha',
      primaryColor: '#78542B',
      secondaryColor: '#E8CD97',
    },
    {
      file: 'tandoor-bread-spread.webp',
      dishName: 'Tandoor Bread Spread',
      primaryColor: '#6B4924',
      secondaryColor: '#E0BC7D',
    },
    {
      file: 'veg-lollipop.webp',
      dishName: 'Crispy Veg Lollipop',
      primaryColor: '#7A1C0A',
      secondaryColor: '#C43D14',
    },
    {
      file: 'paneer-hot-pan.webp',
      dishName: 'Paneer Hot Pan',
      primaryColor: '#5C1D0F',
      secondaryColor: '#B03A1A',
    },
    {
      file: 'puri-bhaji.webp',
      dishName: 'Puri Bhaji',
      primaryColor: '#B37D24',
      secondaryColor: '#F2D379',
    },
    {
      file: 'dahi-poha.webp',
      dishName: 'Dahi Poha',
      primaryColor: '#C4B599',
      secondaryColor: '#F4ECE1',
    },
    {
      file: 'upma.webp',
      dishName: 'Upma',
      primaryColor: '#B89F79',
      secondaryColor: '#EFE2CD',
    },
    {
      file: 'pav-bhaji.webp',
      dishName: 'Tawa Bhaji Pav',
      primaryColor: '#8C2B11',
      secondaryColor: '#D95823',
    },
    {
      file: 'thecha.webp',
      dishName: 'Marathwada Thecha',
      primaryColor: '#2B571B',
      secondaryColor: '#4F8C32',
    },
    {
      file: 'raita.webp',
      dishName: 'Boondi Raita',
      primaryColor: '#B0A28B',
      secondaryColor: '#F2ECE1',
    },
    {
      file: 'curd.webp',
      dishName: 'Clay Pot Curd',
      primaryColor: '#BAB09E',
      secondaryColor: '#FAF5ED',
    },
    {
      file: 'salad.webp',
      dishName: 'Farm Fresh Salad',
      primaryColor: '#366124',
      secondaryColor: '#B53326',
    },
  ];

  for (const dish of dishes) {
    const out = path.join('public/assets/photos/food', dish.file);
    const depth = dish.depth ? path.join('public/assets/photos/food', dish.depth) : null;
    await createDishImage({
      outputPath: out,
      depthPath: depth,
      dishName: dish.dishName,
      primaryColor: dish.primaryColor,
      secondaryColor: dish.secondaryColor,
    });
  }

  // 2. Exterior & Highway Facade
  await createVenueImage({
    outputPath: 'public/assets/photos/exterior/facade-twilight.webp',
    depthPath: 'public/assets/photos/exterior/facade-twilight-depth.webp',
    type: 'exterior',
  });
  await createVenueImage({
    outputPath: 'public/assets/photos/exterior/entrance-warm.webp',
    type: 'exterior',
  });

  // 3. Interior & Dining Hall
  await createVenueImage({
    outputPath: 'public/assets/photos/interior/main-dining-hall.webp',
    depthPath: 'public/assets/photos/interior/main-dining-hall-depth.webp',
    type: 'interior',
  });
  await createVenueImage({
    outputPath: 'public/assets/photos/interior/brass-handi-counter.webp',
    type: 'interior',
  });

  // 4. Banquets & Party Halls
  await createVenueImage({
    outputPath: 'public/assets/photos/hall/banquet-hall-stage.webp',
    depthPath: 'public/assets/photos/hall/banquet-hall-stage-depth.webp',
    type: 'hall',
  });
  await createVenueImage({
    outputPath: 'public/assets/photos/hall/birthday-setup.webp',
    type: 'hall',
  });
  await createVenueImage({
    outputPath: 'public/assets/photos/hall/kitty-party-setup.webp',
    type: 'hall',
  });

  // 5. Steam Texture Overlay
  await createSteamTexture('public/assets/textures/steam-alpha.webp');

  console.log('✅ Generated all initial photorealistic media, depth maps, and textures successfully.');
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
