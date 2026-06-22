export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--logo-start)" />
          <stop offset="100%" stopColor="var(--logo-end)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#logo-grad)" opacity="0.08" />
      <rect x="2" y="2" width="36" height="36" rx="8" stroke="url(#logo-grad)" strokeWidth="1.2" opacity="0.4" />
      <path d="M12 28V12H16L20 20L24 12H28V28H24V19L20 26L16 19V28H12Z" fill="url(#logo-grad)" />
    </svg>
  );
}
