export interface HeadingProps {
  headingText: string;
  secondaryText?: string | null;
}

export default function Heading({
  headingText,
  secondaryText = null,
}: HeadingProps) {
  return (
    <div className="border-b border-b-neutral-700 px-2.5 sm:px-5 md:px-10 py-8 lg:py-12">
      <div className="max-w-[1600px] mx-auto w-full">
        <h1 className="font-aller font-bold text-white text-3xl sm:text-4xl md:text-5xl">
          {headingText}
        </h1>
        {secondaryText && (
          <p className="font-satoshi text-neutral-400 text-xs sm:text-sm mt-2">
            {secondaryText}
          </p>
        )}
      </div>
    </div>
  );
}
