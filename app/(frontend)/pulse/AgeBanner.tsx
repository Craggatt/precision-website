import { CalendarClock } from 'lucide-react';
import AgeLogo from './AgeLogo';
import BookDemoButton from './BookDemoButton';

export default function AgeBanner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-brand-primary-active via-brand-primary to-brand-primary-active">
      {/* Top highlight edge + soft sheen */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 140% at 50% 0%, rgba(255,255,255,0.14) 0%, transparent 100%)',
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-2.5 md:px-5 lg:px-10 py-4 md:py-4.5 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <span className="font-aller font-bold text-white text-lg md:text-xl tracking-wide whitespace-nowrap">
            SEE IT LIVE @
          </span>
          <AgeLogo className="h-5 md:h-6 w-auto text-white" />
          <span className="font-aller font-bold text-white text-lg md:text-xl tracking-wide">
            2026
          </span>
        </div>

        <div aria-hidden className="hidden md:block h-8 w-px bg-white/25" />

        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-white" />
          </span>
          <span className="font-satoshi text-white/90 text-sm whitespace-nowrap">
            Stand 868 · Live demonstrations every hour
          </span>
        </div>

        <div aria-hidden className="hidden md:block h-8 w-px bg-white/25" />

        <BookDemoButton className="inline-flex items-center gap-2.5 font-satoshi font-medium text-sm bg-white text-brand-primary px-6 py-2.5 rounded-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-[transform,box-shadow] duration-200 cursor-pointer whitespace-nowrap">
          <CalendarClock size={16} strokeWidth={1.75} />
          Book a live demonstration
        </BookDemoButton>
      </div>
    </section>
  );
}
