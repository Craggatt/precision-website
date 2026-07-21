import { CalendarClock } from 'lucide-react';
import Image from 'next/image';
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

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-5 py-6 text-left md:grid-cols-[1fr_1.4fr_auto] md:gap-8 md:py-7">
        <div>
          <h2 className="font-aller font-bold text-white text-xl md:text-2xl">
            See It Live at AGE 2026
          </h2>
          <p className="font-satoshi text-white/90 text-sm mt-1">
            Stand 868 | ICC Sydney | 11-13 August
          </p>
          <BookDemoButton className="inline-flex cursor-pointer items-center justify-self-start gap-2.5 whitespace-nowrap rounded-sm bg-white px-6 py-2.5 font-satoshi text-sm font-medium text-brand-primary shadow-md transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg mt-5">
            <CalendarClock size={16} strokeWidth={1.75} />
            BOOK A DEMO
          </BookDemoButton>
        </div>

        {/* <p className="font-satoshi text-white/90 text-sm md:text-base leading-relaxed">
          Experience complete control of your digital signage network in real
          time.
        </p> */}

        {/* <div className="flex flex-col items-start justify-start gap-1 border-t border-white/20 pt-4 sm:flex-row sm:items-center sm:gap-3 md:col-span-3">
          <Image
            src="/images/pulse/pulse.png"
            alt="Precision Pulse"
            width={160}
            height={90}
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <p className="font-satoshi text-white/90 text-sm">
            Decide. Deploy. Done.
          </p>
        </div> */}
      </div>
    </section>
  );
}
