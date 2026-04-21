"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Tag from "../Tag";

const testimonials = [
  {
    quote:
      "The overbank signage Precision installed across our gaming floor has been running 24/7 for three years without a single failure. The quality is unmatched.",
    author: "James Hollis",
    role: "Gaming Floor Manager",
    venue: "The Star Sydney",
  },
  {
    quote:
      "From design brief to installation, the whole process was seamless. They understood our brand requirements and delivered something that genuinely elevates the space.",
    author: "Karen Mace",
    role: "Head of Operations",
    venue: "Twin Towns Services Club",
  },
  {
    quote:
      "We've used three different signage suppliers over the years. Precision Signs is the only one that actually builds for the demands of a casino environment.",
    author: "David Nguyen",
    role: "Facilities Director",
    venue: "Crown Melbourne",
  },
  {
    quote:
      "Their team had our entry displays installed over a weekend with zero disruption to trading. The result looks incredible and our members have noticed.",
    author: "Sarah Okoye",
    role: "Club Manager",
    venue: "Bankstown Sports Club",
  },
];

// Corner dot helper — renders only the corners relevant to this cell's
// position in a 2-col grid so dots never stack at shared edges.
function CornerDot({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const posMap = {
    tl: "top-[-3px] left-[-3px]",
    tr: "top-[-3px] right-[-3px]",
    bl: "bottom-[-3px] left-[-3px]",
    br: "bottom-[-3px] right-[-3px]",
  };
  return (
    <div
      className={`bg-white border border-[#e5e5e5] h-1.25 w-1.25 absolute ${posMap[position]} z-10`}
    />
  );
}

function TestimonialCell({
  testimonial,
  index,
  isLastRow,
  isRightCol,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
  isLastRow: boolean;
  isRightCol: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });

  // Determine which corners this cell "owns".
  // A cell only renders the corner dot for outer corners of the overall grid
  // — inner shared corners belong to only one cell to avoid doubling.
  //
  // Layout (4 cells, 2 cols):
  //   [0 tl] [1 tr]
  //   [2 bl] [3 br]
  //
  // Internal shared corners: top-right of col-0 == top-left of col-1,
  // bottom-right of col-0 == top-right of col-2, etc.
  // Strategy: left column owns the left corners; right column owns the right
  // corners; top row owns the top corners; bottom row owns the bottom corners.
  // Internal intersections are owned by the cell whose corner they are
  // (e.g. bottom-right of cell 0 is NOT rendered — it's covered by the
  // top-left of cell 2 AND the top-right of cell ... actually simplest fix:
  // render ALL corners but use mix-blend or pointer-events, but the cleanest
  // approach is: each cell only renders its outer-facing corners).

  const isLeftCol = !isRightCol;
  const isFirstRow = index < 2;

  // Each cell renders corners that sit on the outer boundary of the grid.
  // Shared interior intersections: only one cell draws each dot.
  // Rule: the cell whose corner lands on an interior crossing "wins" if it is
  // the LOWER-RIGHT cell of that crossing (i.e. the cell that comes later in
  // DOM order), to keep a consistent visual weight.
  const corners: Array<"tl" | "tr" | "bl" | "br"> = [];

  // Top-left dot: outer only if first row AND left col
  if (isFirstRow && isLeftCol) corners.push("tl");
  // Top-right dot: outer only if first row AND right col
  if (isFirstRow && isRightCol) corners.push("tr");
  // Bottom-left dot: outer only if last row AND left col
  if (isLastRow && isLeftCol) corners.push("bl");
  // Bottom-right dot: outer only if last row AND right col
  if (isLastRow && isRightCol) corners.push("br");

  // Interior shared corners — render once, owned by the bottom-right cell
  // of each crossing:
  // Crossing between row 0 bottom-right / row 1 top-right / row 2 top-left / row 3 top-left
  // i.e. the centre-cross of a 2×2 grid → owned by cell index 3 (bottom-right)
  if (index === 3) corners.push("tl"); // centre of grid

  // Right edge of col 0, between row 0 and row 1 → owned by cell 2 (bottom-left) top-right
  if (index === 2) corners.push("tr"); // mid-left edge

  // Left edge of col 1, between row 0 and row 1 → already handled by cell 3 "tl" above
  // (centre dot covers both mid-left and mid-right of the internal horizontal border)

  // Bottom of row 0 col 1 / top of row 1 col 1 → owned by cell 3 top-right
  // This is the mid-right edge crossing; cell 3 "tr" would be outer — already covered.
  // Actually for a 2×2 grid there are 4 internal crossing points on the border lines:
  //   A) mid-top (top of the horizontal divider, between col 0 and col 1 on row 0 bottom border)
  //      → between cells 0(br), 1(bl)  → assign to cell 1 (bl)
  //   B) mid-left (left of vertical divider on row border, between cells 0(br) and 2(tr))
  //      → assign to cell 2 (tr)  [done above]
  //   C) centre (intersection of both dividers)
  //      → between 0(br),1(bl),2(tr),3(tl) → assign to cell 3 (tl)  [done above]
  //   D) mid-right (right of vertical divider, between cells 1(bl) and 3(tl))
  //      → assign to cell 3 (already getting tl, this is actually the same point as C in a 2-col grid)

  // For a 2-column grid the only interior horizontal crossing is the centre line.
  // Let's just handle the two mid-edge dots cleanly:
  // - Bottom edge of cell 0 / top edge of cell 2, at the LEFT side of that shared border → outer corner, already done (cell 2 tl is outer ✓)
  // - Bottom edge of cell 1 / top edge of cell 3, at the RIGHT side → outer corner for cell 3 (tr is outer ✓)
  // - The CENTRE crossing (shared by all 4 cells) → assign to cell 1 bl
  if (index === 1) corners.push("bl"); // centre crossing

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className={[
        "relative p-5 md:p-10 overflow-hidden bg-neutral-800",
        // Right border: only left column cells, and only on md+ (1-col on mobile)
        isLeftCol ? "md:border-r md:border-neutral-700" : "",
        // Bottom border: only top row cells
        isFirstRow ? "border-b border-neutral-700" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* {corners.map((pos) => (
        <CornerDot key={pos} position={pos} />
      ))} */}

      {/* Quote mark */}
      <span
        className="block font-aller font-bold text-[3rem] leading-none mb-4 text-neutral-600"
        aria-hidden
      >
        &ldquo;
      </span>

      <p className="font-satoshi text-neutral-300 text-[0.95rem] leading-relaxed mb-8">
        {testimonial.quote}
      </p>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full shrink-0 bg-neutral-300" />
        <div>
          <p className="font-aller font-bold text-neutral-200 text-[0.85rem] leading-snug">
            {testimonial.author}
          </p>
          <p className="font-satoshi text-[0.75rem] text-neutral-400 mt-0.5">
            {testimonial.role} · {testimonial.venue}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });

  const totalCols = 2;
  const totalRows = Math.ceil(testimonials.length / totalCols);

  return (
    <section className="border-t border-neutral-700 bg-neutral-900">
      <div className="max-w-[1600px] mx-auto border-x border-neutral-700 relative bg-neutral-900">
        {/* Outer container corners — these four are always present */}
        {/* <div className="bg-white border border-[#e5e5e5] h-1.25 w-1.25 absolute -top-0.75 -left-0.75 z-10" />
        <div className="bg-white border border-[#e5e5e5] h-1.25 w-1.25 absolute -top-0.75 -right-0.75 z-10" />
        <div className="bg-white border border-[#e5e5e5] h-1.25 w-1.25 absolute -bottom-0.75 -left-0.75 z-10" />
        <div className="bg-white border border-[#e5e5e5] h-1.25 w-1.25 absolute -bottom-0.75 -right-0.75 z-10" /> */}

        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0 }}
          animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative px-5 md:px-10 py-10 md:py-12 border-b border-b-neutral-700 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          {/* Header has its own bottom-edge crossing dots */}
          <div className="bg-white border border-[#e5e5e5] h-1.25 w-1.25 absolute -bottom-0.75 -left-0.75 z-10" />
          <div className="bg-white border border-[#e5e5e5] h-1.25 w-1.25 absolute -bottom-0.75 -right-0.75 z-10" />

          <div>
            <Tag number="04" text="TESTIMONIALS" />
            <h2 className="font-aller font-bold text-neutral-50 text-3xl md:text-5xl leading-tight mt-300">
              Trusted by Australia&apos;s
              <br />
              leading venues
            </h2>
          </div>
          <p className="font-satoshi text-neutral-400 text-[0.9rem] leading-relaxed max-w-sm">
            From major casinos to regional clubs, our signage is installed
            across hundreds of gaming venues nationwide.
          </p>
        </motion.div>

        {/* Testimonial grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {testimonials.map((testimonial, index) => {
            const col = index % totalCols;
            const row = Math.floor(index / totalCols);
            return (
              <TestimonialCell
                key={testimonial.author}
                testimonial={testimonial}
                index={index}
                isLastRow={row === totalRows - 1}
                isRightCol={col === totalCols - 1}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
