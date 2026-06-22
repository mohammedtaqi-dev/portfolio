export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--logo-start)" />
          <stop offset="100%" stopColor="var(--logo-end)" />
        </linearGradient>
      </defs>
      <path d="M20 2L36 18L20 34L4 18Z" fill="url(#logo-grad)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      <path d="M20 9L27 18L20 27L13 18Z" fill="white" opacity="0.2" />
      <path d="M20 13L24 18L20 23L16 18Z" fill="white" opacity="0.95" />
    </svg>
  );
}
