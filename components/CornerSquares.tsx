/**
 * Renders four small squares at the corners of a relatively-positioned parent.
 * The squares sit exactly on the corner intersection point, matching the border
 * colour and filled with the section background.
 */
export default function CornerSquares({ bg = "#ffffff" }: { bg?: string }) {
  return (
    <>
      <span
        aria-hidden
        className="absolute -top-[3.5px] -left-[3.5px] w-[7px] h-[7px] border border-[#e5e5e5] z-10"
        style={{ background: bg }}
      />
      <span
        aria-hidden
        className="absolute -top-[3.5px] -right-[3.5px] w-[7px] h-[7px] border border-[#e5e5e5] z-10"
        style={{ background: bg }}
      />
      <span
        aria-hidden
        className="absolute -bottom-[3.5px] -left-[3.5px] w-[7px] h-[7px] border border-[#e5e5e5] z-10"
        style={{ background: bg }}
      />
      <span
        aria-hidden
        className="absolute -bottom-[3.5px] -right-[3.5px] w-[7px] h-[7px] border border-[#e5e5e5] z-10"
        style={{ background: bg }}
      />
    </>
  );
}
