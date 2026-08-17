import Scramble from "./Scramble";

export interface TagProps {
  number: string;
  text: string;
  variant?: "sm" | "md";
}
export default function Tag({ number, text, variant = "md" }: TagProps) {
  return (
    <div className="inline-flex w-fit">
      {/* Left: number, darker, bevels only on the LEFT corners */}
      <div
        className={`bg-brand-primary-active ${variant === "md" ? "px-3 py-2 text-xs" : "px-1.5 py-1 text-[10px]"}  font-medium tracking-widest text-white
    [clip-path:polygon(8px_0,100%_0,100%_100%,0_100%,0_8px)]`}
      >
        <p className="font-mono text-white/50">{number}</p>
      </div>
      <div
        className={`bg-brand-primary ${variant === "md" ? "px-4 py-2 text-xs" : "px-1.5 py-1 text-[10px]"}  font-medium tracking-widest text-white
    [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]`}
      >
        <Scramble
          text={text}
          tag="span"
          className="font-mono text-white text-xs tracking-widest uppercase leading-none"
          duration={500}
          stagger={40}
          iterationsPerChar={4}
          triggerOnce={true}
          triggerOnHover={true}
          respectReducedMotion={true}
        />
      </div>
    </div>
  );
}
