export function ThemisLogo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Base da balança */}
      <line x1="50" y1="20" x2="50" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Barra horizontal */}
      <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Corrente esquerda */}
      <line x1="25" y1="30" x2="25" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Corrente direita */}
      <line x1="75" y1="30" x2="75" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Prato esquerdo */}
      <ellipse cx="25" cy="55" rx="12" ry="4" fill="currentColor" opacity="0.8" />
      <path d="M 13 55 Q 25 58 37 55" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Prato direito */}
      <ellipse cx="75" cy="55" rx="12" ry="4" fill="currentColor" opacity="0.8" />
      <path d="M 63 55 Q 75 58 87 55" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Base do suporte */}
      <circle cx="50" cy="20" r="3" fill="currentColor" />
      <rect x="45" y="70" width="10" height="8" rx="1" fill="currentColor" />
      <rect x="40" y="78" width="20" height="4" rx="1" fill="currentColor" />
    </svg>
  )
}
