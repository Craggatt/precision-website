import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { payloadService } from "@/services/payloadService";
import ServiceSupportForm from "./ServiceSupportForm";
import { QrCode, Mail, Phone } from "lucide-react";

export default async function ServiceSupportPage() {
  const [products, productCategories] = await Promise.all([
    payloadService.getProducts(),
    payloadService.getProductCategories(),
  ]);

  return (
    <>
      <main className="min-h-screen bg-neutral-900 flex flex-col">
        <Navbar ready={true} products={products} productCategories={productCategories} />

        {/* Hero Section */}
        <div className="px-10 border-b border-b-neutral-700 flex flex-col">
          <div className="max-w-[1600px] mt-12.5 mx-auto p-10 w-full flex-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-primary">
              — We're here to help
            </span>
            <h1 className="font-aller font-bold text-5xl mt-3">
              Service & Support
            </h1>
            <p className="font-satoshi text-neutral-400 text-base mt-3 max-w-2xl leading-relaxed">
              We provide a service that delivers total peace of mind that your digital
              signage investment is being kept at its best.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 px-2.5 md:px-5 lg:px-10">
          <div className="max-w-[1600px] mx-auto border-x border-neutral-700 bg-neutral-800/30">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Support Options */}
              <div className="p-10 border-r border-neutral-700 flex flex-col gap-8">
                <div>
                  <h2 className="font-aller font-bold text-3xl mb-6">
                    How to Get Support
                  </h2>
                  <p className="font-satoshi text-neutral-300 text-sm leading-relaxed">
                    Choose the method that works best for you. Our support team is
                    ready to help with any issues or questions about your signage.
                  </p>
                </div>

                {/* QR Code Support */}
                <div className="p-6 bg-neutral-900/50 border border-neutral-700 rounded-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-primary/10 rounded-sm border border-brand-primary/30 shrink-0">
                      <QrCode className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-mono uppercase text-[11px] text-neutral-500 tracking-[0.12em] mb-2">
                        01 — QR Code
                      </h3>
                      <h4 className="font-aller font-bold text-xl mb-2">
                        Scan for Instant Support
                      </h4>
                      <p className="font-satoshi text-neutral-400 text-sm leading-relaxed">
                        Look for the QR code on your signage (typically near the power
                        switch). Scan it to access our online portal and report issues
                        directly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Support */}
                <div className="p-6 bg-neutral-900/50 border border-neutral-700 rounded-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-primary/10 rounded-sm border border-brand-primary/30 shrink-0">
                      <Mail className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-mono uppercase text-[11px] text-neutral-500 tracking-[0.12em] mb-2">
                        02 — Email
                      </h3>
                      <h4 className="font-aller font-bold text-xl mb-2">
                        Email Support
                      </h4>
                      <p className="font-satoshi text-neutral-400 text-sm leading-relaxed mb-3">
                        Send us detailed information about your issue including fault
                        description, venue name, sign description, and serial number.
                      </p>
                      <a
                        href="mailto:support@precisionsigns.com.au"
                        className="font-mono text-brand-primary text-sm hover:text-white transition-colors"
                      >
                        support@precisionsigns.com.au
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Support */}
                <div className="p-6 bg-neutral-900/50 border border-neutral-700 rounded-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-primary/10 rounded-sm border border-brand-primary/30 shrink-0">
                      <Phone className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-mono uppercase text-[11px] text-neutral-500 tracking-[0.12em] mb-2">
                        03 — Phone
                      </h3>
                      <h4 className="font-aller font-bold text-xl mb-2">
                        Call Our Team
                      </h4>
                      <p className="font-satoshi text-neutral-400 text-sm leading-relaxed mb-3">
                        Speak directly with our support team during business hours.
                      </p>
                      <a
                        href="tel:+61269213591"
                        className="font-mono text-brand-primary text-sm hover:text-white transition-colors block mb-2"
                      >
                        +61 2 6921 3591
                      </a>
                      <p className="font-mono text-neutral-500 text-xs">
                        Mon – Fri 7:30am - 4:30pm (AEST)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 p-5 bg-neutral-900/50 border border-neutral-700 rounded-sm">
                  <h3 className="label-mono mb-2">RESPONSE TIME</h3>
                  <p className="font-satoshi text-neutral-400 text-xs leading-relaxed">
                    We aim to respond to all support requests within one business day.
                    For urgent issues affecting your operations, please call us directly
                    during business hours.
                  </p>
                </div>
              </div>

              {/* Support Request Form */}
              <ServiceSupportForm />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
