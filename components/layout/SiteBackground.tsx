/**
 * Fixed, decorative atmosphere rendered behind all content.
 * A warm paper canvas with a faint grid and two very restrained tints.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base — warm paper */}
      <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas to-canvas-soft" />

      {/* Fine grid, faded toward the edges */}
      <div className="bg-grid-fine mask-fade-edges absolute inset-0" />

      {/* Restrained atmospheric tints */}
      <div className="absolute -top-[22%] left-[12%] h-[62vh] w-[72vw] rounded-full bg-accent/[0.045] blur-[130px]" />
      <div className="absolute right-[-12%] bottom-[-18%] h-[52vh] w-[52vw] rounded-full bg-violet/[0.04] blur-[130px]" />
    </div>
  );
}