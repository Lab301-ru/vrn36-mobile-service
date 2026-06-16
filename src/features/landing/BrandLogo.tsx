type MarkProps = { className?: string };

/** VRN-36 logomark — engineered hexagon with a charged "V" vector (Quiet Voltage). */
export function LogoMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bmEdge" x1="32" y1="6" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#67E8F9" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#22D3EE" stopOpacity="0.22" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="bmVector" x1="20" y1="22" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A5F3FC" />
          <stop offset="0.55" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
        <radialGradient id="bmGlow" cx="0.5" cy="0.46" r="0.5">
          <stop offset="0" stopColor="#22D3EE" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="#22D3EE" stopOpacity="0.08" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="30" r="20" fill="url(#bmGlow)" />
      <path d="M32 4 54.27 17 54.27 43 32 56 9.73 43 9.73 17Z" fill="#0B0F17" stroke="url(#bmEdge)" strokeWidth="1.5" />
      <path d="M32 11 48.27 20.5 48.27 39.5 32 49 15.73 39.5 15.73 20.5Z" fill="none" stroke="#243047" strokeWidth="1" />
      <g stroke="#243047" strokeWidth="1" strokeLinecap="round" opacity="0.9">
        <path d="M32 5.6 32 9" />
        <path d="M32 51 32 54.4" />
      </g>
      <path d="M22 23 L32 41 L42 23" fill="none" stroke="url(#bmVector)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="41" r="2.4" fill="#A5F3FC" />
      <circle cx="32" cy="41" r="4.6" fill="none" stroke="#22D3EE" strokeOpacity="0.5" strokeWidth="1" />
    </svg>
  );
}

/** Full horizontal lockup: the VRN-36 wordmark + "mobile service" tagline. */
export function BrandLockup({ className }: MarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <img
        src="/vrn36-horizontal-white.png"
        alt="VRN-36 Mobile Service"
        width={4287}
        height={918}
        draggable={false}
        className="h-6 w-auto select-none sm:h-7"
      />
      <span
        aria-hidden="true"
        className="flex flex-col border-l border-white/15 pl-2.5 text-[0.58rem] font-medium uppercase leading-[1.25] tracking-[0.2em] text-slate-400"
      >
        <span>mobile</span>
        <span>service</span>
      </span>
    </span>
  );
}
