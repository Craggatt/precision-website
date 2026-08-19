import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteFormSection from '@/components/sections/QuoteFormSection';
import Heading from '@/components/Heading';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';
import { payloadService } from '@/services/payloadService';
import { Media } from '@/payload-types';

function getImageUrl(
  media: { relationTo: string; value: number | Media } | null | undefined
): string | null {
  if (!media || typeof media.value !== 'object') return null;
  return (media.value as Media).url ?? null;
}

export default async function ProjectsPage() {
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
    { label: 'Projects' },
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
          headingText="Projects"
          secondaryText="Recent casino, club, and hotel signage installations across Australia"
        />

        {/* Project Grid */}
        <div className="flex-1 px-2.5 md:px-5 lg:px-10">
          <div className="max-w-[1600px] mx-auto border-x border-neutral-700 bg-neutral-800/30">
            <div className="p-2.5 sm:p-5 lg:p-10">
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {projects.map(project => {
                    const imageUrl = getImageUrl(project.featuredImage);
                    return (
                      <a
                        key={project.id}
                        href={`/projects/${project.slug}`}
                        className="group flex flex-col bg-neutral-900 border border-neutral-700 overflow-hidden transition-colors hover:border-neutral-500"
                      >
                        <div className="relative aspect-4/3 overflow-hidden bg-neutral-800">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={project.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="font-mono text-neutral-600 text-xs uppercase tracking-widest">
                                No image available
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4 sm:p-5">
                          <h3 className="font-aller font-bold text-white text-lg sm:text-xl leading-tight group-hover:text-brand-primary transition-colors">
                            {project.name}
                          </h3>
                        </div>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                  <p className="font-aller font-bold text-white text-xl">
                    No projects found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <QuoteFormSection />
        <Footer />
      </main>
    </>
  );
}
