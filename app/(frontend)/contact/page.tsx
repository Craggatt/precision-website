import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { payloadService } from '@/services/payloadService';
import ContactForm from './ContactForm';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';
import Heading from '@/components/Heading';

export default async function ContactPage() {
  const [products, productCategories, content, contentCategories, projects] =
    await Promise.all([
      payloadService.getProducts(),
      payloadService.getProductCategories(),
      payloadService.getContent(),
      payloadService.getContentCategories(),
      payloadService.getProjects(),
    ]);
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <main className="min-h-screen bg-neutral-900 flex flex-col">
        <Navbar
          ready={true}
          products={products}
          productCategories={productCategories}
          content={content}
          contentCategories={contentCategories}
          projects={projects}
        />
        <Breadcrumb items={breadcrumbItems} />
        <Heading
          headingText="Contact Us"
          secondaryText="Get in touch with our team for quotes, support, or general inquiries"
        />
        <div className="flex-1 px-2.5 md:px-5 lg:px-10 border-b border-b-neutral-700">
          <div className="max-w-[1600px] mx-auto border-x border-neutral-700 bg-neutral-800/30">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="px-2.5 md:px-5 lg:px-10 py-10 lg:border-r border-neutral-700 border-b lg:border-b-0">
                <h2 className="font-aller font-bold text-2xl sm:text-3xl mb-4 sm:mb-6">
                  Get in Touch
                </h2>
                <p className="font-satoshi text-neutral-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                  Whether you need a quote for a new project, have questions
                  about our products, or require support, we're here to help.
                  Our team of experts is ready to assist you with all your
                  gaming signage needs.
                </p>

                <div className="space-y-4 sm:space-y-6">
                  {/* Address */}
                  <div>
                    <h3 className="label-mono mb-2">ADDRESS</h3>
                    <p className="font-satoshi text-neutral-300 text-xs sm:text-sm">
                      Precision Signs Pty Ltd
                      <br />
                      Wagga Wagga, NSW
                      <br />
                      Australia
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <h3 className="label-mono mb-2">PHONE</h3>
                    <a
                      href="tel:0269213591"
                      className="font-satoshi text-neutral-300 text-xs sm:text-sm hover:text-brand-primary transition-colors"
                    >
                      02 6921 3591
                    </a>
                  </div>

                  {/* Email */}
                  <div>
                    <h3 className="label-mono mb-2">EMAIL</h3>
                    <a
                      href="mailto:info@precisionsigns.com.au"
                      className="font-satoshi text-neutral-300 text-xs sm:text-sm hover:text-brand-primary transition-colors"
                    >
                      info@precisionsigns.com.au
                    </a>
                  </div>

                  {/* Business Hours */}
                  <div>
                    <h3 className="label-mono mb-2">BUSINESS HOURS</h3>
                    <p className="font-satoshi text-neutral-300 text-xs sm:text-sm">
                      Monday - Friday: 8:00 AM - 5:00 PM AEST
                      <br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 sm:mt-10 p-4 sm:p-5 bg-neutral-900/50 border border-neutral-700 rounded-sm">
                  <h3 className="label-mono mb-2">AUSTRALIAN MADE</h3>
                  <p className="font-satoshi text-neutral-400 text-xs leading-relaxed">
                    Proudly manufacturing LED signage solutions in Australia
                    since 1975. We serve casinos, clubs, and hotels across the
                    country with quality products and exceptional service.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
