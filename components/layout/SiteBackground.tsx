/**
 * Fixed, decorative atmosphere rendered behind all content.
 * Layered near-black surfaces, a fine grid, and two restrained glows.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#08080a]" />

      {/* Fine grid, faded toward the edges */}
      <div className="bg-grid-fine mask-fade-edges absolute inset-0" />

      {/* Atmospheric glows */}
      <div className="absolute -top-[25%] left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[130px]" />
      <div className="absolute right-[-15%] bottom-[-15%] h-[55vh] w-[55vw] rounded-full bg-violet-600/[0.06] blur-[130px]" />

      {/* Top sheen */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
    </div>
  );
}
