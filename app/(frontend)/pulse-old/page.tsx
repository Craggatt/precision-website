import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteFormSection from '@/components/sections/QuoteFormSection';
import DemoFormSection from '@/components/sections/DemoFormSection';
import { payloadService } from '@/services/payloadService';
import AgeLogo from './AgeLogo';
import BookDemoButton from './BookDemoButton';
import FloatingDemoButton from './FloatingDemoButton';
import RealCostSection from './RealCostSection';
import ChangesProcessSection from './ChangesProcessSection';
import WhySection from './WhySection';
import FoundingVenueSection from './FoundingVenueSection';
import FaqSection from './FaqSection';
import PulseCTASection from './PulseCTASection';

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
        className="relative h-screen bg-cover bg-no-repeat flex flex-col"
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
        <div className="flex-1 flex flex-col justify-between max-w-[1600px] mx-auto w-full px-2.5 md:px-5 lg:px-10 pt-28 md:pt-36 lg:pt-40 pb-10 md:pb-14">
          <div>
            <h1 className="font-aller font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Stop Waiting Days To Update{' '}
              <br className="hidden md:block"></br>
              Your Gaming Floor
            </h1>
            <p className="font-satoshi max-w-md mt-5 text-neutral-300 text-sm md:text-base">
              Cut display update times from days to moments — no supplier
              bottlenecks, no approval chains, no waiting.
            </p>
          </div>

          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="font-aller font-bold text-white text-xl md:text-2xl tracking-wide">
                SEE IT LIVE @
              </span>
              <AgeLogo className="h-5 md:h-6 w-auto text-white" />
              <span className="font-aller font-bold text-white text-xl md:text-2xl tracking-wide">
                2026
              </span>
            </div>
            <p className="font-satoshi text-neutral-300 text-sm md:text-base leading-relaxed mt-3">
              Visit Stand 868 and watch a live demonstration, every hour —
              content created, approved and deployed across multiple displays
              in moments. No simulations. Just proof.
            </p>
            <BookDemoButton className="font-satoshi text-sm bg-brand-primary text-white px-5 py-2.5 rounded-sm hover:bg-brand-primary-hover transition-colors font-medium mt-6 cursor-pointer">
              Book Your Demonstration
            </BookDemoButton>
          </div>
        </div>
        {/* Full-width brand rule under the hero */}
        <div className="h-1.5 bg-brand-primary" />
      </div>

      <RealCostSection />
      <ChangesProcessSection />
      <WhySection />
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
