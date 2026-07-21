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

      <div className="relative max-w-6xl mx-auto px-5 lg:px-10 py-6 md:py-7 grid grid-cols-1 md:grid-cols-[1fr_1.4fr_auto] items-center gap-5 md:gap-8 text-center md:text-left">
        <div>
          <h2 className="font-aller font-bold text-white text-xl md:text-2xl">
            See It Live at AGE 2026
          </h2>
          <p className="font-satoshi text-white/90 text-sm mt-1">
            Stand 868 | ICC Sydney | 11-13 August
          </p>
        </div>

        <p className="font-satoshi text-white/90 text-sm md:text-base leading-relaxed">
          Experience complete control of your digital signage network in real
          time.
        </p>

        <BookDemoButton className="inline-flex justify-self-center items-center gap-2.5 font-satoshi font-medium text-sm bg-white text-brand-primary px-6 py-2.5 rounded-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-[transform,box-shadow] duration-200 cursor-pointer whitespace-nowrap">
          <CalendarClock size={16} strokeWidth={1.75} />
          BOOK A DEMO
        </BookDemoButton>

        <div className="md:col-span-3 border-t border-white/20 pt-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
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
        </div>
      </div>
    </section>
  );
}
