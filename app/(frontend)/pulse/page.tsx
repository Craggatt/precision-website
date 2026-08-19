import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteFormSection from '@/components/sections/QuoteFormSection';
import WaitingListFormSection from '@/components/sections/WaitingListFormSection';
import { payloadService } from '@/services/payloadService';
import BookDemoButton from './BookDemoButton';
import FloatingDemoButton from './FloatingDemoButton';
import RealCostSection from './RealCostSection';
import ChangesProcessSection from './ChangesProcessSection';
import GamingFloorSection from './GamingFloorSection';
import WhySection from './WhySection';
import FaqSection from './FaqSection';
import { CalendarClock } from 'lucide-react';

export default async function Pulse() {
  const [products, productCategories, content, contentCategories, projects] =
    await Promise.all([
      payloadService.getProducts(),
      payloadService.getProductCategories(),
      payloadService.getContent(),
      payloadService.getContentCategories(),
      payloadService.getProjects(),
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
          projects={projects}
          logoVariant="pulse"
        />
        <div className="flex-1 flex flex-col justify-between max-w-[1600px] mx-auto w-full px-2.5 md:px-5 lg:px-10 pt-28 md:pt-36 lg:pt-40 pb-10 md:pb-14">
          <div>
            <h1 className="font-aller font-bold text-4xl sm:text-5xl md:text-6xl leading-tight">
              The new standard for gaming displays{' '}
              <br className="hidden md:block"></br>
              <span className="text-brand-primary">Decide. Deploy. Done.</span>
            </h1>
            <p className="font-satoshi max-w-md mt-5 text-neutral-300 text-sm md:text-base">
              Why wait days to update a screen? Precision Pulse will give
              operators the power to push live changes across the entire floor
              instantly. Welcome to the future of display technology – take
              total control forever.
            </p>
          </div>

          <div className="max-w-md">
            <BookDemoButton className="font-satoshi text-sm bg-brand-primary text-white px-5 py-2.5 rounded-sm hover:bg-brand-primary-hover transition-colors font-medium mt-6 cursor-pointer flex flex-row gap-3">
              Join Waiting List
              <CalendarClock size={16} strokeWidth={1.75} />
            </BookDemoButton>
          </div>
        </div>
        {/* Full-width brand rule under the hero */}
        <div className="h-1.5 bg-brand-primary" />
      </div>

      <RealCostSection />
      <ChangesProcessSection />
      <GamingFloorSection />
      <WhySection />
      {/* <FoundingVenueSection /> */}
      <FaqSection />
      <Footer />
      <QuoteFormSection />
      <WaitingListFormSection />
      <FloatingDemoButton />
    </main>
  );
}
