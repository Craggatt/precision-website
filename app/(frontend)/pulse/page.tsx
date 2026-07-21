import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteFormSection from '@/components/sections/QuoteFormSection';
import DemoFormSection from '@/components/sections/DemoFormSection';
import { payloadService } from '@/services/payloadService';
import PulseHero from './PulseHero';
import ComparisonSection from './ComparisonSection';
import AgeBanner from './AgeBanner';

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
      <div className="relative flex flex-col min-h-screen bg-neutral-900 overflow-hidden">
        {/* Background: faint artwork top-right + brand glow + dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-top-right opacity-10"
          style={{
            backgroundImage: "url('/images/pulse-bg.webp')",
            maskImage:
              'radial-gradient(70% 90% at 85% 10%, black 0%, transparent 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 35%, rgba(11,111,211,0.12) 0%, transparent 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 background-texture-faint"
          style={{
            maskImage:
              'radial-gradient(80% 80% at 50% 0%, black 0%, transparent 100%)',
          }}
        />

        <div className="relative flex-1 flex flex-col">
          <Navbar
            ready={true}
            products={products}
            productCategories={productCategories}
            content={content}
            contentCategories={contentCategories}
            logoVariant="pulse"
          />
          <div className="flex-1 flex flex-col justify-center gap-7 md:gap-8 pt-24 md:pt-18 pb-8 md:pb-10">
            <PulseHero />
            <ComparisonSection />
          </div>
        </div>

        <AgeBanner />
      </div>

      <Footer />
      <QuoteFormSection />
      <DemoFormSection />
    </main>
  );
}
