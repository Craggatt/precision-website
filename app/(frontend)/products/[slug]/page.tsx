import { notFound } from 'next/navigation';
import React from 'react';
import { payloadService } from '@/services/payloadService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteFormSection from '@/components/sections/QuoteFormSection';
import QuoteButton from './QuoteButton';
import {
  Product,
  ProductCategory,
  ProductSubcategory,
  Media,
} from '@/payload-types';
import {
  Check,
  Zap,
  Network,
  Gauge,
  ArrowUpRight,
  Shield,
  MapPin,
  Headphones,
} from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';
import CTASection from '@/components/sections/CTASection';
import type { Metadata } from 'next';
import InfiniteImageScroll from '@/components/InfiniteImageScroll';

type Params = Promise<{ slug: string }>;

/* ----------------------------- types ----------------------------- */

type LexicalNode = {
  type: string;
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  children?: LexicalNode[];
};

/* ----------------------------- metadata ----------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await payloadService.getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const categoryName =
    typeof product.category === 'object'
      ? (product.category as ProductCategory).name
      : '';

  const imageUrl = getImageUrl(product.featuredImage);

  // Extract plain text description from rich text
  let plainDescription = '';
  if (product.description?.root?.children) {
    const extractText = (node: LexicalNode): string => {
      if (node.type === 'text') return node.text || '';
      if (node.children) {
        return node.children.map(extractText).join(' ');
      }
      return '';
    };
    plainDescription = product.description.root.children
      .map(extractText)
      .join(' ')
      .slice(0, 160);
  }

  const description =
    plainDescription ||
    `${product.name} - ${categoryName} gaming signage solution. Model: ${product.code}. Engineered for 24/7 operation in high-traffic gaming venues.`;

  const features =
    product.features
      ?.map(f => f.feature)
      .filter((f): f is string => Boolean(f)) || [];

  return {
    title: `${product.name} - ${categoryName}`,
    description: description,
    keywords: [
      product.name,
      categoryName,
      product.code,
      'gaming signage',
      'casino displays',
      ...features,
    ],
    openGraph: {
      title: `${product.name} - ${categoryName}`,
      description: description,
      type: 'website',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - ${categoryName}`,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

/* ----------------------------- helpers ----------------------------- */

function getImageUrl(
  media: { relationTo: string; value: number | Media } | null | undefined
): string | null {
  if (!media || typeof media.value !== 'object') return null;
  return (media.value as Media).url ?? null;
}

function getCategoryName(product: Product): string {
  return typeof product.category === 'object'
    ? (product.category as ProductCategory).name
    : '';
}

function getSubcategoryName(product: Product): string | null {
  const subs = product.subcategory;
  if (!subs || subs.length === 0) return null;
  const first = subs[0];
  return typeof first === 'object' ? (first as ProductSubcategory).name : null;
}

/* ----------------------------- rich text ----------------------------- */

function renderNode(node: LexicalNode, key: number): React.ReactNode {
  if (node.type === 'text') {
    let el: React.ReactNode = node.text ?? '';
    if ((node.format ?? 0) & 1)
      el = (
        <strong key={`b-${key}`} className="text-white font-semibold">
          {el}
        </strong>
      );
    if ((node.format ?? 0) & 2) el = <em key={`i-${key}`}>{el}</em>;
    return el;
  }
  if (node.type === 'linebreak') return <br key={key} />;

  const children = (node.children ?? []).map((child, i) =>
    renderNode(child, i)
  );

  switch (node.type) {
    case 'paragraph':
      return (
        <p
          key={key}
          className="font-satoshi text-neutral-300  leading-[1.7] mb-3 last:mb-0"
        >
          {children}
        </p>
      );
    case 'heading':
      return (
        <h3
          key={key}
          className="font-aller font-bold text-white text-xl mb-3 mt-6 first:mt-0"
        >
          {children}
        </h3>
      );
    case 'list':
      return node.listType === 'number' ? (
        <ol
          key={key}
          className="list-decimal list-inside space-y-1.5 mb-5 marker:text-brand-primary"
        >
          {children}
        </ol>
      ) : (
        <ul
          key={key}
          className="list-disc list-inside space-y-1.5 mb-5 marker:text-brand-primary"
        >
          {children}
        </ul>
      );
    case 'listitem':
      return (
        <li key={key} className="font-satoshi text-neutral-300 text-base">
          {children}
        </li>
      );
    default:
      return <React.Fragment key={key}>{children}</React.Fragment>;
  }
}

function RichText({ content }: { content: Product['description'] }) {
  const root = content.root as { children: LexicalNode[] };
  return <>{root.children.map((node, i) => renderNode(node, i))}</>;
}

/* ----------------------------- category palette ----------------------------- */

const CATEGORY_ACCENT: Record<
  string,
  { dot: string; text: string; border: string; glow: string }
> = {
  'Overbank Signage': {
    dot: 'bg-brand-primary',
    text: 'text-brand-primary',
    border: 'border-brand-primary/40',
    glow: 'shadow-[0_0_24px_-6px_rgb(59_130_246/0.5)]',
  },
  'Entry Displays': {
    dot: 'bg-brand-primary',
    text: 'text-brand-primary',
    border: 'border-brand-primary/40',
    glow: 'shadow-[0_0_24px_-6px_rgb(59_130_246/0.5)]',
  },
  Screens: {
    dot: 'bg-brand-primary',
    text: 'text-brand-primary',
    border: 'border-brand-primary/40',
    glow: 'shadow-[0_0_24px_-6px_rgb(59_130_246/0.5)]',
  },
  Infills: {
    dot: 'bg-brand-primary',
    text: 'text-brand-primary',
    border: 'border-brand-primary/40',
    glow: 'shadow-[0_0_24px_-6px_rgb(59_130_246/0.5)]',
  },
  'Jackpot History': {
    dot: 'bg-brand-primary',
    text: 'text-brand-primary',
    border: 'border-brand-primary/40',
    glow: 'shadow-[0_0_24px_-6px_rgb(59_130_246/0.5)]',
  },
  'Large Screens': {
    dot: 'bg-brand-primary',
    text: 'text-brand-primary',
    border: 'border-brand-primary/40',
    glow: 'shadow-[0_0_24px_-6px_rgb(59_130_246/0.5)]',
  },
};

const DEFAULT_ACCENT = {
  dot: 'bg-neutral-400',
  text: 'text-neutral-300',
  border: 'border-neutral-600',
  glow: '',
};

/* ----------------------------- corner brackets ----------------------------- */

function CornerBrackets() {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neutral-600" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neutral-600" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neutral-600" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neutral-600" />
    </>
  );
}

/* ----------------------------- page ----------------------------- */

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  const [product, products, productCategories, content, contentCategories] =
    await Promise.all([
      payloadService.getProductBySlug(slug),
      payloadService.getProducts(),
      payloadService.getProductCategories(),
      payloadService.getContent(),
      payloadService.getContentCategories(),
    ]);

  if (!product) notFound();

  const imageUrl = getImageUrl(product.featuredImage);
  const categoryName = getCategoryName(product);
  const subcategoryName = getSubcategoryName(product);
  const accent = CATEGORY_ACCENT[categoryName] ?? DEFAULT_ACCENT;

  console.log(product);

  const req = product.requirements;
  const designDiagramUrl = getImageUrl(req?.design ?? null);
  const hasRequirements =
    req &&
    (req.powerOutlets || req.ethernetPorts || req.maxAmps || req.voltage);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    ...(categoryName
      ? [
          {
            label: categoryName,
            href: `/products?cat=${encodeURIComponent(categoryName)}`,
          },
        ]
      : []),
    { label: product.name },
  ];

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex flex-col">
      <Navbar
        ready={true}
        products={products}
        productCategories={productCategories}
        content={content}
        contentCategories={contentCategories}
      />

      <Breadcrumb items={breadcrumbItems} />

      {/* ============== Hero ============== */}
      <section className="relative border-b border-neutral-800 overflow-hidden">
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 grid grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-16">
          <aside className="col-span-12 lg:col-span-2 lg:border-r lg:border-neutral-800 lg:pr-6">
            <div className="flex lg:flex-col gap-6 lg:gap-8 lg:sticky lg:top-24">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
                  Series
                </p>
                <p
                  className={`font-aller font-bold text-sm flex items-center gap-2 `}
                >
                  {categoryName}
                </p>
              </div>
              {subcategoryName && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Type
                  </p>
                  <p className="font-aller font-bold text-sm text-neutral-200">
                    {subcategoryName}
                  </p>
                </div>
              )}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
                  MODEL
                </p>
                <p className="font-aller font-bold text-sm text-neutral-200">
                  {product.code}
                </p>
              </div>
            </div>
          </aside>

          {/* CENTER — Title + image */}
          <div className="col-span-12 lg:col-span-7">
            {/* Display SKU as graphic element */}
            <h1 className="font-aller font-bold text-white text-5xl lg:text-7xl leading-[0.95] tracking-tight mb-8">
              {product.name}
            </h1>

            {/* Image card with corner brackets */}
            <BorderGlow
              backgroundColor="#171717"
              borderRadius={0}
              colors={['#0b6fd3', '#1a7fe3', '#0958a8']}
              glowColor="210 90 60"
              glowIntensity={1.2}
              glowRadius={50}
              edgeSensitivity={20}
              className="max-w-[1600px] mx-auto"
            >
              <div
                className={`relative bg-neutral-800 aspect-[4/3] overflow-hidden`}
              >
                {/* Tick marks on top */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1 items-end h-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-px bg-neutral-600 ${i % 2 === 0 ? 'h-2' : 'h-1'}`}
                    />
                  ))}
                </div>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-12"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-neutral-600 text-xs uppercase tracking-widest">
                      No image available
                    </span>
                  </div>
                )}
                {/* Bottom rule with label */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 max-w-[200px]">
                    {categoryName == 'Overbank Signage'
                      ? 'HALO DS MINI does not come standard with the LED Infills shown here, but can be upgraded to include them on request.'
                      : ''}
                  </span>
                  {product.code && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                      {product.code}
                    </span>
                  )}
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* RIGHT — Quote panel (sticky) */}
          <aside className="col-span-12 lg:col-span-3 mt-[100px]">
            <div className="lg:sticky lg:top-24 flex flex-col gap-4 justify-between h-full">
              <div className="flex flex-col gap-4">
                <div className="relative bg-neutral-800 border border-neutral-700 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
                    Pricing
                  </p>
                  <p className="font-aller font-bold text-white text-2xl mb-1">
                    Enquire For Pricing
                  </p>
                  <p className="font-satoshi text-sm text-neutral-400 mb-5 leading-relaxed">
                    Site survey & engineering quote prepared per venue.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <QuoteButton />
                    {/* <a
                    href="mailto:info@precisionsigns.com.au"
                    className="group flex items-center justify-between font-satoshi text-sm font-semibold py-3 px-4 border border-neutral-700 text-neutral-200 hover:border-neutral-500 hover:bg-neutral-800/50 transition-colors"
                  >
                    Talk to engineering
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a> */}
                  </div>
                </div>

                <RichText content={product.description} />
              </div>

              {/* Quote CTA card */}
              {/* Trust strip */}
              <ul className="flex flex-col gap-2 mt-1">
                <li className="flex items-center gap-2.5 text-sm text-neutral-400 font-satoshi">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  Designed & manufactured in Australia
                </li>
                <li className="flex items-center gap-2.5 text-sm text-neutral-400 font-satoshi">
                  <Shield className="w-3.5 h-3.5 text-neutral-500" />
                  3-year parts & labour warranty
                </li>
                <li className="flex items-center gap-2.5 text-sm text-neutral-400 font-satoshi">
                  <Headphones className="w-3.5 h-3.5 text-neutral-500" />
                  24/7 support portal access
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ============== Section: Overview ============== */}

      {/* ============== Section: Features ============== */}
      {product.features && product.features.length > 0 && (
        <section className="border-b border-neutral-800 bg-neutral-900/30">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid grid-cols-12 gap-6 lg:gap-10 py-16 lg:py-20">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                ── 01
              </p>
              <h2 className="font-aller font-bold text-white text-2xl lg:text-3xl leading-tight">
                Key features
              </h2>
              <p className="font-satoshi text-sm text-neutral-400 mt-3 max-w-xs">
                Engineered for high-traffic gaming floors and 24/7 operation.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <ul className="grid sm:grid-cols-2 gap-px bg-neutral-800 border border-neutral-700">
                {product.features.map((f, i) =>
                  f.feature ? (
                    <li
                      key={i}
                      className="bg-neutral-800 p-5 lg:p-6 flex items-start gap-4 hover:bg-neutral-900 transition-colors group"
                    >
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`w-7 h-7 ${accent.border} border flex items-center justify-center group-hover:${accent.dot.replace('bg-', 'bg-')} transition-colors`}
                        >
                          <Check className={`w-3.5 h-3.5 ${accent.text}`} />
                        </span>
                      </div>
                      <span className="font-satoshi text-neutral-200 text-base leading-snug pt-1">
                        {f.feature}
                      </span>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ============== Section: Power & Connectivity ============== */}
      {hasRequirements && (
        <section className="border-b border-neutral-800">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid grid-cols-12 gap-6 lg:gap-10 py-16 lg:py-20">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                ── 02
              </p>
              <h2 className="font-aller font-bold text-white text-2xl lg:text-3xl leading-tight">
                Power & connectivity
              </h2>
              <p className="font-satoshi text-sm text-neutral-400 mt-3 max-w-xs">
                Site requirements for installation. Our engineers handle all
                on-site work.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-700">
                {req!.powerOutlets ? (
                  <SpecBlock
                    icon={<Zap className="w-4 h-4" />}
                    label="Power outlets"
                    value={String(req!.powerOutlets)}
                    accent={accent.text}
                  />
                ) : null}
                {req!.ethernetPorts ? (
                  <SpecBlock
                    icon={<Network className="w-4 h-4" />}
                    label="Ethernet ports"
                    value={String(req!.ethernetPorts)}
                    accent={accent.text}
                  />
                ) : null}
                {req!.voltage ? (
                  <SpecBlock
                    icon={<Zap className="w-4 h-4" />}
                    label="Voltage"
                    value={String(req!.voltage)}
                    unit="V"
                    accent={accent.text}
                  />
                ) : null}
                {req!.maxAmps ? (
                  <SpecBlock
                    icon={<Zap className="w-4 h-4" />}
                    label="Max amps"
                    value={String(req!.maxAmps)}
                    unit="A"
                    accent={accent.text}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============== Section: Technical diagram ============== */}
      {designDiagramUrl && (
        <section className="border-b border-neutral-800 bg-neutral-900/30">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                  ── 03
                </p>
                <h2 className="font-aller font-bold text-white text-2xl lg:text-3xl leading-tight">
                  Technical drawing
                </h2>
              </div>
              {product.code && (
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Drawing ref:{' '}
                  <span className="text-neutral-200">{product.code}-DWG</span>
                </p>
              )}
            </div>
            <div className="relative border border-neutral-800 bg-white p-8 lg:p-12">
              <CornerBrackets />
              <img
                src={designDiagramUrl}
                alt={`${product.name} technical diagram`}
                className="max-w-full max-h-[720px] object-contain mx-auto"
              />
            </div>
          </div>
        </section>
      )}
      {product.gallery && product.gallery.length > 0 && (
        <section className="border-b border-neutral-800 bg-neutral-900/30">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <InfiniteImageScroll
              images={product.gallery
                .map(entry => getImageUrl(entry))
                .filter((url): url is string => url !== null)}
            />
          </div>
        </section>
      )}

      <CTASection tagNumber="01" />
      <Footer />
      <QuoteFormSection />
    </main>
  );
}

/* ----------------------------- spec block ----------------------------- */

function SpecBlock({
  icon,
  label,
  value,
  unit,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  accent: string;
}) {
  return (
    <div className="bg-neutral-800 p-5 lg:p-6 flex flex-col gap-3 hover:bg-neutral-900 transition-colors">
      <div className="flex items-center justify-between">
        <span className={`${accent}`}>{icon}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
          spec
        </span>
      </div>
      <div>
        <p className="font-aller font-bold text-white text-3xl lg:text-4xl leading-none">
          {value}
          {unit && (
            <span className="text-base text-neutral-400 ml-1 font-satoshi font-normal">
              {unit}
            </span>
          )}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-2">
          {label}
        </p>
      </div>
      <QuoteFormSection />
    </div>
  );
}
