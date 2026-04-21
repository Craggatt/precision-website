/**
 * Renders four small squares at the corners of a relatively-positioned parent.
 * The squares sit exactly on the corner intersection point, matching the border
 * colour and filled with the section background.
 */
export default function CornerSquares({ bg = "#111111", borderColor = "#2a2a2a" }: { bg?: string; borderColor?: string }) {
  return (
    <>
      <span
        aria-hidden
        className="absolute -top-[3.5px] -left-[3.5px] w-[7px] h-[7px] z-10"
        style={{ background: bg, border: `1px solid ${borderColor}` }}
      />
      <span
        aria-hidden
        className="absolute -top-[3.5px] -right-[3.5px] w-[7px] h-[7px] z-10"
        style={{ background: bg, border: `1px solid ${borderColor}` }}
      />
      <span
        aria-hidden
        className="absolute -bottom-[3.5px] -left-[3.5px] w-[7px] h-[7px] z-10"
        style={{ background: bg, border: `1px solid ${borderColor}` }}
      />
      <span
        aria-hidden
        className="absolute -bottom-[3.5px] -right-[3.5px] w-[7px] h-[7px] z-10"
        style={{ background: bg, border: `1px solid ${borderColor}` }}
      />
    </>
  );
}
