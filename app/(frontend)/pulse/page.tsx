import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteFormSection from '@/components/sections/QuoteFormSection';
import DemoFormSection from '@/components/sections/DemoFormSection';
import BookDemoButton from './BookDemoButton';
import FloatingDemoButton from './FloatingDemoButton';
import PulseCTASection from './PulseCTASection';
import { payloadService } from '@/services/payloadService';
import FeaturesSection from './FeaturesSection';
import DelaySection from './DelaySection';
import GamingFloorSection from './GamingFloorSection';
import IntroSection from './IntroSection';
import ShiftSection from './ShiftSection';
import WhySection from './WhySection';
import AgeChallengeSection from './AgeChallengeSection';
import FoundingVenueSection from './FoundingVenueSection';
import FaqSection from './FaqSection';

function InfiniteTextScroller() {
  const items = Array(6).fill(null);

  return (
    <div className="absolute bottom-4 left-0 right-0 overflow-hidden whitespace-nowrap mix-blend-difference opacity-20">
      <div className="inline-flex animate-scroll">
        {items.map((_, i) => (
          <div key={i} className="flex shrink-0">
            <span className="font-aller font-bold text-4xl md:text-5xl lg:text-6xl text-white mx-16">
              Multiple Displays.
            </span>
            <span className="font-aller font-bold text-4xl md:text-5xl lg:text-6xl text-white mx-16">
              Under 60 Seconds.
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Pulse() {
  const [products, productCategories, content, contentCategories] =
    await Promise.all([
      payloadService.getProducts(),
      payloadService.getProductCategories(),
      payloadService.getContent(),
      payloadService.getContentCategories(),
    ]);

  return (
    <main className="min-h-screen">
      <div
        className="relative h-screen bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/images/pulse-bg.webp')",
          backgroundPosition: 'left bottom',
        }}
      >
        <Navbar
          ready={true}
          products={products}
          productCategories={productCategories}
          content={content}
          contentCategories={contentCategories}
        />
        <div className="pt-28 md:pt-36 lg:pt-40 max-w-[1600px] mx-auto px-2.5 md:px-5 lg:px-10">
          <h1 className="font-aller font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Stop Waiting Days To Update{' '}
            <br className="hidden md:block"></br>
            Your Gaming Floor
          </h1>
          <p className="font-satoshi max-w-md lg:max-w-1/3 mt-6 text-neutral-300 text-sm md:text-base">
            Hospitality and gaming venues are reducing display update times from
            days to under 60 seconds. No supplier bottlenecks, no approval delays,
            no endless email chains — just faster execution, greater control and a
            more responsive venue.
          </p>
          <BookDemoButton className="font-satoshi  bg-brand-primary text-white px-4 py-1.5 rounded-sm hover:bg-[#2a2a2a] transition-colors font-medium mt-6 cursor-pointer">
            Book My Demo
          </BookDemoButton>
        </div>
        <InfiniteTextScroller />
      </div>
      <FeaturesSection />
      <DelaySection />
      <GamingFloorSection />
      <IntroSection />
      <ShiftSection />
      <WhySection />
      <AgeChallengeSection />
      <FoundingVenueSection />
      <FaqSection />
      <PulseCTASection />
      <Footer />
      <QuoteFormSection />
      <DemoFormSection />
      <FloatingDemoButton />
    </main>
  );
}
