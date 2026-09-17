import React from 'react';

interface LyallpurLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'monogram';
  invertOnDark?: boolean;
}

export const LyallpurLogo: React.FC<LyallpurLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
}) => {
  // Dimensions according to size
  const dimensions = {
    sm: { w: 140, h: 48 },
    md: { w: 190, h: 64 },
    lg: { w: 260, h: 88 },
    xl: { w: 340, h: 115 },
  }[size];

  if (variant === 'monogram') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-12 h-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="monoRedGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#DC1B27" />
              <stop offset="100%" stopColor="#9E0B14" />
            </radialGradient>
            <linearGradient id="monoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E2AF" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#AA7C11" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#monoRedGrad)" stroke="url(#monoGoldGrad)" strokeWidth="3" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="url(#monoGoldGrad)" strokeWidth="1" strokeDasharray="2,2" />
          <path
            d="M50 20 C54 26, 52 30, 50 32 C48 30, 46 26, 50 20 Z"
            fill="url(#monoGoldGrad)"
          />
          <path
            d="M44 24 C48 28, 46 32, 43 32 C41 30, 41 26, 44 24 Z"
            fill="url(#monoGoldGrad)"
          />
          <path
            d="M56 24 C52 28, 54 32, 57 32 C59 30, 59 26, 56 24 Z"
            fill="url(#monoGoldGrad)"
          />
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontFamily="'Playfair Display', 'Times New Roman', serif"
            fontWeight="bold"
            fontSize="30"
            fill="#FFFFFF"
            letterSpacing="2"
          >
            LP
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width: dimensions.w, height: dimensions.h }}
      title="Lyallpur Sweets - Official Brand Logo"
    >
      <svg
        viewBox="0 0 540 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          {/* Gradients for Rich Regal Red */}
          <radialGradient id="logoRedOval" cx="50%" cy="46%" r="58%">
            <stop offset="0%" stopColor="#E31826" />
            <stop offset="65%" stopColor="#BF101C" />
            <stop offset="100%" stopColor="#960A13" />
          </radialGradient>

          {/* Gradients for Metallic Gold */}
          <linearGradient id="richGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE8B3" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#C39A2B" />
            <stop offset="100%" stopColor="#946C0F" />
          </linearGradient>

          <linearGradient id="goldFiligree" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#DFBA67" />
            <stop offset="50%" stopColor="#FBE9BD" />
            <stop offset="100%" stopColor="#BF9224" />
          </linearGradient>

          {/* Subtle drop shadow */}
          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* LEFT ORNAMENTAL SCROLLWORK / WING */}
        <g id="left-flourish" fill="url(#goldFiligree)">
          <path d="M 65 92 C 45 92, 28 85, 20 72 C 14 62, 17 48, 28 42 C 38 36, 52 42, 54 52 C 55 60, 48 68, 40 68 C 34 68, 30 63, 31 57 C 32 52, 36 50, 40 52 C 36 56, 32 68, 48 74 C 62 79, 78 82, 95 84 C 91 87, 82 91, 65 92 Z" />
          <path d="M 52 42 C 60 30, 75 25, 90 28 C 84 34, 76 38, 70 46 C 65 42, 58 40, 52 42 Z" />
          <path d="M 38 88 C 22 96, 12 110, 18 122 C 24 132, 40 132, 52 122 C 60 114, 62 102, 60 92 C 54 94, 46 92, 38 88 Z" />
          <path d="M 70 118 C 76 126, 88 132, 102 134 C 98 128, 92 120, 84 116 C 78 116, 74 117, 70 118 Z" />
        </g>

        {/* RIGHT ORNAMENTAL SCROLLWORK / WING */}
        <g id="right-flourish" fill="url(#goldFiligree)" transform="translate(540, 0) scale(-1, 1)">
          <path d="M 65 92 C 45 92, 28 85, 20 72 C 14 62, 17 48, 28 42 C 38 36, 52 42, 54 52 C 55 60, 48 68, 40 68 C 34 68, 30 63, 31 57 C 32 52, 36 50, 40 52 C 36 56, 32 68, 48 74 C 62 79, 78 82, 95 84 C 91 87, 82 91, 65 92 Z" />
          <path d="M 52 42 C 60 30, 75 25, 90 28 C 84 34, 76 38, 70 46 C 65 42, 58 40, 52 42 Z" />
          <path d="M 38 88 C 22 96, 12 110, 18 122 C 24 132, 40 132, 52 122 C 60 114, 62 102, 60 92 C 54 94, 46 92, 38 88 Z" />
          <path d="M 70 118 C 76 126, 88 132, 102 134 C 98 128, 92 120, 84 116 C 78 116, 74 117, 70 118 Z" />
        </g>

        {/* MAIN OVAL BACKGROUND WITH GOLD EMBOSSED BORDER */}
        <ellipse
          cx="270"
          cy="90"
          rx="182"
          ry="78"
          fill="url(#logoRedOval)"
          filter="url(#logoShadow)"
        />

        {/* Outer Gold Border */}
        <ellipse
          cx="270"
          cy="90"
          rx="182"
          ry="78"
          fill="none"
          stroke="url(#richGold)"
          strokeWidth="6.5"
        />

        {/* Inner Fine Gold Inset Pin-Stripe */}
        <ellipse
          cx="270"
          cy="90"
          rx="174"
          ry="71"
          fill="none"
          stroke="#F8E5BA"
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* TOP CIRCULAR BRUSH RING CREST */}
        <g id="top-crest">
          {/* Circular textured gold brush wreath */}
          <circle
            cx="270"
            cy="44"
            r="22"
            fill="none"
            stroke="url(#richGold)"
            strokeWidth="3.5"
            strokeDasharray="4 2 8 3 6 2"
          />
          <circle
            cx="270"
            cy="44"
            r="19"
            fill="none"
            stroke="#FDE8B3"
            strokeWidth="1"
            strokeDasharray="2 3 5 2"
          />

          {/* Tiny 3-petal Crown/Lotus above LP */}
          <path
            d="M 270 28 C 271.5 31, 271.5 33, 270 34 C 268.5 33, 268.5 31, 270 28 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 266 30 C 268 32, 267.5 33.5, 266 34 C 264.5 33.5, 264.5 31.5, 266 30 Z"
            fill="url(#richGold)"
          />
          <path
            d="M 274 30 C 272 32, 272.5 33.5, 274 34 C 275.5 33.5, 275.5 31.5, 274 30 Z"
            fill="url(#richGold)"
          />

          {/* "LP" Monogram */}
          <text
            x="270"
            y="52"
            textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="bold"
            fontSize="15"
            fill="#FFFFFF"
            letterSpacing="1"
          >
            LP
          </text>
        </g>

        {/* "Lyallpur" TYPOGRAPHY (Exact replica of brand serif lettering) */}
        <g id="brand-name">
          {/* Subtle text shadow for high-end definition */}
          <text
            x="270"
            y="114"
            textAnchor="middle"
            fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
            fontWeight="700"
            fontSize="68"
            fill="#75060D"
            letterSpacing="-0.5"
            opacity="0.6"
            dx="0.5"
            dy="1.5"
          >
            Lyallpur
          </text>
          <text
            x="270"
            y="114"
            textAnchor="middle"
            fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
            fontWeight="700"
            fontSize="68"
            fill="#FFFFFF"
            letterSpacing="-0.5"
          >
            Lyallpur
          </text>
        </g>

        {/* BOTTOM WHEAT SHEAF WREATH & CENTRAL LOTUS FLOURISH */}
        <g id="bottom-wheat" fill="url(#richGold)">
          {/* Central Lotus Motif */}
          <path d="M 270 128 C 273 133, 273 137, 270 142 C 267 137, 267 133, 270 128 Z" fill="#FCE8B6" />
          <path d="M 264 132 C 267 135, 266 138, 263 140 C 261 138, 261 134, 264 132 Z" />
          <path d="M 276 132 C 273 135, 274 138, 277 140 C 279 138, 279 134, 276 132 Z" />

          {/* Left Wheat Ears */}
          <g id="left-ears">
            {/* Grain 1 */}
            <path d="M 252 135 C 244 132, 238 136, 234 142 C 242 144, 248 140, 252 135 Z" />
            <path d="M 255 142 C 247 141, 242 147, 240 154 C 248 153, 253 148, 255 142 Z" />
            {/* Grain 2 */}
            <path d="M 234 145 C 224 142, 218 147, 212 154 C 222 155, 228 150, 234 145 Z" />
            <path d="M 235 155 C 226 154, 220 160, 216 166 C 225 164, 230 160, 235 155 Z" />
            {/* Grain 3 */}
            <path d="M 210 154 C 200 151, 194 156, 188 163 C 198 164, 204 159, 210 154 Z" />
            <path d="M 212 165 C 202 164, 196 169, 192 173 C 200 171, 206 168, 212 165 Z" />
            {/* Outer Stalk Arc */}
            <path d="M 260 138 Q 230 148 180 174" stroke="url(#richGold)" strokeWidth="2.5" fill="none" />
          </g>

          {/* Right Wheat Ears (Mirrored) */}
          <g id="right-ears" transform="translate(540, 0) scale(-1, 1)">
            {/* Grain 1 */}
            <path d="M 252 135 C 244 132, 238 136, 234 142 C 242 144, 248 140, 252 135 Z" />
            <path d="M 255 142 C 247 141, 242 147, 240 154 C 248 153, 253 148, 255 142 Z" />
            {/* Grain 2 */}
            <path d="M 234 145 C 224 142, 218 147, 212 154 C 222 155, 228 150, 234 145 Z" />
            <path d="M 235 155 C 226 154, 220 160, 216 166 C 225 164, 230 160, 235 155 Z" />
            {/* Grain 3 */}
            <path d="M 210 154 C 200 151, 194 156, 188 163 C 198 164, 204 159, 210 154 Z" />
            <path d="M 212 165 C 202 164, 196 169, 192 173 C 200 171, 206 168, 212 165 Z" />
            {/* Outer Stalk Arc */}
            <path d="M 260 138 Q 230 148 180 174" stroke="url(#richGold)" strokeWidth="2.5" fill="none" />
          </g>
        </g>

        {/* REGISTERED TRADEMARK SYMBOL (R) AT UPPER RIGHT */}
        <g id="registered-mark" transform="translate(458, 28)">
          <circle cx="9" cy="9" r="8" fill="none" stroke="#2B1A15" strokeWidth="1.2" />
          <text
            x="9"
            y="12.5"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            fontSize="10"
            fill="#2B1A15"
          >
            R
          </text>
        </g>
      </svg>
    </div>
  );
};
