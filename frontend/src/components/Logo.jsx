import React from 'react';

/**
 * Modern SVG Logo for Campus Companion AI - MNNIT Allahabad
 * @param {Object} props
 * @param {string|number} [props.size='md'] - 'sm' (28px), 'md' (38px), 'lg' (48px), 'xl' (80px), or custom number
 * @param {boolean} [props.withText=false] - Whether to render full horizontal lockup with typography
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const LogoIcon = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    xs: 22,
    sm: 28,
    md: 38,
    lg: 48,
    xl: 72,
  };

  const dimension = typeof size === 'number' ? size : sizeMap[size] || 38;

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`campus-logo-icon ${className}`}
      aria-label="Campus Companion MNNIT Logo"
    >
      <defs>
        <linearGradient id="iconNavy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0B2545" />
          <stop offset="100%" stop-color="#163863" />
        </linearGradient>

        <linearGradient id="iconGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#EA580C" />
        </linearGradient>

        <linearGradient id="iconCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>

        <filter id="iconGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#F59E0B" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Rounded Square Emblem Container */}
      <rect x="32" y="32" width="448" height="448" rx="104" fill="url(#iconNavy)" />
      <rect
        x="33.5"
        y="33.5"
        width="445"
        height="445"
        rx="102.5"
        fill="none"
        stroke="rgba(255, 255, 255, 0.14)"
        strokeWidth="3"
      />

      {/* Outer Interlocking C Arc */}
      <path
        d="M 330 148 C 210 140, 130 205, 130 290 C 130 365, 205 408, 300 400"
        fill="none"
        stroke="rgba(255, 255, 255, 0.16)"
        strokeWidth="20"
        strokeLinecap="round"
      />

      {/* Dynamic Golden Swoop Arc */}
      <path
        d="M 108 340 
           C 170 415, 310 425, 404 336 
           C 418 322, 422 308, 408 304 
           C 392 300, 376 318, 350 334 
           C 278 376, 186 360, 126 318 Z"
        fill="url(#iconGold)"
        filter="url(#iconGlow)"
      />

      {/* Graduation Cap (Mortarboard) */}
      <polygon points="256,140 395,200 256,260 117,200" fill="#FFFFFF" />
      <polygon points="256,140 117,200 256,260" fill="url(#iconCyan)" opacity="0.14" />

      {/* Mortarboard Base Arch */}
      <path
        d="M 168,225 
           L 168,268 
           C 168,306, 344,306, 344,268 
           L 344,225 
           C 314,244, 285,250, 256,250 
           C 227,250, 198,244, 168,225 Z"
        fill="#FFFFFF"
      />

      {/* Button & Golden Tassel */}
      <circle cx="256" cy="200" r="9" fill="url(#iconGold)" />
      <path
        d="M 256 200 Q 326 206, 358 244 Q 366 266, 364 298"
        fill="none"
        stroke="url(#iconGold)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="357" y="296" width="14" height="22" rx="3.5" fill="url(#iconGold)" />

      {/* AI Sparks (4-point star) */}
      <g transform="translate(400, 130)">
        <path
          d="M 0 -26 Q 0 0 26 0 Q 0 0 0 26 Q 0 0 -26 0 Q 0 0 0 -26 Z"
          fill="url(#iconGold)"
          filter="url(#iconGlow)"
        />
        <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
      </g>

      <g transform="translate(122, 268)">
        <path d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="url(#iconGold)" />
        <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
      </g>

      {/* Circuit AI Node */}
      <circle cx="150" cy="155" r="5.5" fill="#38BDF8" />
      <line
        x1="150"
        y1="155"
        x2="185"
        y2="175"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeDasharray="3 3"
        opacity="0.7"
      />

      {/* MNNIT inscription */}
      <text
        x="256"
        y="434"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="26"
        fontWeight="800"
        fill="#F8FAFC"
        letterSpacing="5"
      >
        MNNIT
      </text>
    </svg>
  );
};

const Logo = ({ size = 'md', withText = true, className = '' }) => {
  if (!withText) {
    return <LogoIcon size={size} className={className} />;
  }

  return (
    <div className={`campus-brand-lockup ${className}`}>
      <LogoIcon size={size} />
      <div className="brand-text">
        <div className="brand-title-row">
          <span className="brand-title">Campus Companion</span>
          <span className="brand-badge">AI</span>
        </div>
        <span className="brand-subline">MNNIT Allahabad</span>
      </div>
    </div>
  );
};

export default Logo;
