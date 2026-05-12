import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { payloadService } from '@/services/payloadService';

export default async function ContentPage() {
  const [products, productCategories, content, contentCategories] =
    await Promise.all([
      payloadService.getProducts(),
      payloadService.getProductCategories(),
      payloadService.getContent(),
      payloadService.getContentCategories(),
    ]);

  return (
    <>
      <main className="min-h-screen bg-neutral-900 flex flex-col">
        <Navbar
          ready={true}
          products={products}
          productCategories={productCategories}
          content={content}
          contentCategories={contentCategories}
        />
        <div className="px-10 border-b border-b-neutral-700 flex flex-col">
          <div className="max-w-[1600px] mt-12.5 mx-auto p-10 w-full flex-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-primary">
              — Knowledge Base
            </span>
            <h1 className="font-aller font-bold text-5xl mt-3">
              Content Library
            </h1>
            <p className="font-satoshi text-neutral-400 text-base mt-3 max-w-2xl leading-relaxed">
              Browse our collection of resources, guides, and information.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 px-2.5 md:px-5 lg:px-10">
          <div className="max-w-[1600px] mx-auto border-x border-neutral-700 bg-neutral-800/30">
            <div className="p-10">
              {contentCategories.map(category => {
                const categoryContent = content.filter(c => {
                  const cat = c.category;
                  return typeof cat === 'object'
                    ? cat.id === category.id
                    : cat === category.id;
                });

                if (categoryContent.length === 0) return null;

                return (
                  <div key={category.id} className="mb-12">
                    <h2 className="font-aller font-bold text-3xl mb-6">
                      {category.name}
                    </h2>
                    <p className="font-satoshi text-neutral-400 text-sm mb-6">
                      {category.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryContent.map(item => (
                        <a
                          key={item.id}
                          href={`/content/${item.slug}`}
                          className="p-6 bg-neutral-900/50 border border-neutral-700 rounded-sm hover:border-brand-primary/50 transition-colors group"
                        >
                          <h3 className="font-aller font-bold text-xl mb-2 group-hover:text-brand-primary transition-colors">
                            {item.name}
                          </h3>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
