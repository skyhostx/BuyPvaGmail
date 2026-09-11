import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import toIco from 'to-ico';

const publicDir = path.resolve('public');
const distDir = path.resolve('dist');

// High-resolution Master SVG for Favicon with pure white squircle base and pixel-perfect Gmail geometry
const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="envelope-shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.10" />
    </filter>
  </defs>

  <!-- Clean high-contrast white rounded background squircle -->
  <rect x="8" y="8" width="496" height="496" rx="112" fill="#FFFFFF" />
  <rect x="8" y="8" width="496" height="496" rx="112" fill="none" stroke="#E2E8F0" stroke-width="12" />

  <!-- Gmail Envelope Geometric Layers -->
  <g filter="url(#envelope-shadow)">
    <!-- Base white envelope backing inside squircle -->
    <rect x="64" y="112" width="384" height="288" rx="28" fill="#FFFFFF" />

    <!-- Left Vertical Pillar (Google Blue #4285F4) -->
    <path
      d="M74 152 V372 C74 388 87 400 104 400 H154 V236 L74 152 Z"
      fill="#4285F4"
    />

    <!-- Right Vertical Pillar (Google Green #34A853) -->
    <path
      d="M438 152 V372 C438 388 425 400 408 400 H358 V236 L438 152 Z"
      fill="#34A853"
    />

    <!-- Center Bottom Mail Fold / Tray (Google Red Soft #EA4335) -->
    <path
      d="M154 236 V400 H358 V236 L256 312 L154 236 Z"
      fill="#EA4335"
      fill-opacity="0.95"
    />

    <!-- Left Top Diagonal Fold (Google Yellow / Amber #FBBC05) -->
    <path
      d="M74 152 L154 236 L256 164 L200 122 C184 110 160 110 144 122 L74 152 Z"
      fill="#FBBC05"
    />

    <!-- Right Top Diagonal Fold (Google Red #EA4335) -->
    <path
      d="M438 152 L358 236 L256 164 L312 122 C328 110 352 110 368 122 L438 152 Z"
      fill="#EA4335"
    />

    <!-- Top Center Arch (Deep Dark Red Shadow #C5221F) -->
    <path
      d="M200 122 L256 164 L312 122 C295 109 276 104 256 104 C236 104 217 109 200 122 Z"
      fill="#C5221F"
    />
  </g>
</svg>`;

async function generateFavicons() {
  console.log('🎨 Generating Google Search compliant Favicon suite...');

  // 1. Write favicon.svg to public/
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), masterSvg, 'utf8');
  console.log('✓ Created public/favicon.svg');

  const svgBuffer = Buffer.from(masterSvg);

  // 2. Generate PNG sizes required by Google Search, Web Standards & Apple
  // Google explicitly requires a multiple of 48px square: 48x48, 96x96, 144x144, 192x192, 512x512
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' }, // Primary Google Search recommendation
    { size: 48, name: 'favicon.png' },       // Standard fallback
    { size: 96, name: 'favicon-96x96.png' }, // Google Search 2x multiple
    { size: 144, name: 'favicon-144x144.png' }, // Google Search 3x multiple
    { size: 180, name: 'apple-touch-icon.png' }, // Apple iOS home screen
    { size: 192, name: 'favicon-192x192.png' }, // Android / Chrome PWA
    { size: 512, name: 'favicon-512x512.png' }  // High-res PWA splash & Google Play
  ];

  const pngBuffers = {};

  for (const item of sizes) {
    const pngBuffer = await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png({ compressionLevel: 9 })
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, item.name), pngBuffer);
    pngBuffers[item.size] = pngBuffer;
    console.log(`✓ Created public/${item.name} (${item.size}x${item.size})`);
  }

  // 3. Generate multi-resolution favicon.ico containing 16x16, 32x32, and 48x48
  // This ensures Googlebot-Image and traditional browsers fetching /favicon.ico receive a valid multi-size ICO
  const icoBuffer = await toIco([
    pngBuffers[16],
    pngBuffers[32],
    pngBuffers[48]
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Created public/favicon.ico (Multi-size: 16px, 32px, 48px)');

  // 4. If dist directory exists, copy all generated favicon files into dist/
  if (fs.existsSync(distDir)) {
    const faviconFiles = [
      'favicon.ico',
      'favicon.svg',
      'favicon.png',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'favicon-48x48.png',
      'favicon-96x96.png',
      'favicon-144x144.png',
      'favicon-192x192.png',
      'favicon-512x512.png',
      'apple-touch-icon.png'
    ];

    for (const f of faviconFiles) {
      const srcPath = path.join(publicDir, f);
      const destPath = path.join(distDir, f);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
    console.log('✓ Synchronized all favicon files to dist/');
  }

  console.log('🎉 Favicon suite generation completed successfully!');
}

generateFavicons().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
