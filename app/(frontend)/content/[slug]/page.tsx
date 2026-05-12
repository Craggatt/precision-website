import { notFound } from 'next/navigation';
import React from 'react';
import { payloadService } from '@/services/payloadService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Content, ContentCategory, ContentSubcategory } from '@/payload-types';
import Tag from '@/components/Tag';
import CTASection from '@/components/sections/CTASection';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';
import Heading from '@/components/Heading';

type Params = Promise<{ slug: string }>;

/* ----------------------------- helpers ----------------------------- */

function getCategoryName(content: Content): string {
  return typeof content.category === 'object'
    ? (content.category as ContentCategory).name
    : '';
}

function getSubcategoryName(content: Content): string | null {
  const subs = content.subcategory;
  if (!subs || subs.length === 0) return null;
  const first = subs[0];
  return typeof first === 'object' ? (first as ContentSubcategory).name : null;
}

/* ----------------------------- rich text ----------------------------- */

type LexicalNode = {
  type: string;
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  children?: LexicalNode[];
};

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
          className="font-satoshi text-neutral-300 leading-[1.7] mb-4 last:mb-0"
        >
          {children}
        </p>
      );
    case 'heading':
      return (
        <h3
          key={key}
          className="font-aller font-bold text-white text-2xl mb-4 mt-8 first:mt-0"
        >
          {children}
        </h3>
      );
    case 'list':
      return node.listType === 'number' ? (
        <ol
          key={key}
          className="font-satoshi text-neutral-300 leading-relaxed list-decimal list-inside mb-4 space-y-2"
        >
          {children}
        </ol>
      ) : (
        <ul
          key={key}
          className="font-satoshi text-neutral-300 leading-relaxed list-disc list-inside mb-4 space-y-2"
        >
          {children}
        </ul>
      );
    case 'listitem':
      return <li key={key}>{children}</li>;
    default:
      return <div key={key}>{children}</div>;
  }
}

function renderRichText(richTextData: any): React.ReactNode {
  if (!richTextData?.root?.children) return null;
  return richTextData.root.children.map((node: LexicalNode, i: number) =>
    renderNode(node, i)
  );
}

/* ----------------------------- main component ----------------------------- */

export default async function ContentDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const [
    contentItem,
    products,
    productCategories,
    allContent,
    contentCategories,
  ] = await Promise.all([
    payloadService.getContentBySlug(slug),
    payloadService.getProducts(),
    payloadService.getProductCategories(),
    payloadService.getContent(),
    payloadService.getContentCategories(),
  ]);

  if (!contentItem) {
    notFound();
  }

  const categoryName = getCategoryName(contentItem);
  const subcategoryName = getSubcategoryName(contentItem);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Content', href: '/content' },
    ...(categoryName
      ? [
          {
            label: categoryName,
            href: `/content?cat=${encodeURIComponent(categoryName)}`,
          },
        ]
      : []),
    { label: contentItem.name },
  ];

  return (
    <>
      <main className="min-h-screen bg-neutral-900 flex flex-col">
        <Navbar
          ready={true}
          products={products}
          productCategories={productCategories}
          content={allContent}
          contentCategories={contentCategories}
        />
        {/* Hero Section */}

        <Breadcrumb items={breadcrumbItems} />
        <Heading headingText={contentItem.name} />
        {/* Intro / Image Section */}
        {(contentItem.description || contentItem.featureImage) && (
          <div className="w-full px-2.5 md:px-5 lg:px-10 border-b border-b-neutral-700">
            <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto border-x border-x-neutral-700">
              {contentItem.description && (
                <div className="flex-1 flex flex-col items-start justify-center gap-4 sm:gap-6 px-2.5 md:px-5 lg:px-10 py-10 lg:border-r lg:border-r-neutral-700 border-b lg:border-b-0 border-b-neutral-700">
                  <p className="font-aller text-neutral-200 text-lg sm:text-xl md:text-2xl leading-snug">
                    {contentItem.description}
                  </p>
                  {contentItem.contentSections &&
                    contentItem.contentSections.length > 0 && (
                      <a
                        href="#details"
                        className="group inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-neutral-400 hover:text-brand-primary transition-colors"
                      >
                        Read More
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-y-0.5"
                        >
                          ↓
                        </span>
                      </a>
                    )}
                </div>
              )}
              {contentItem.featureImage &&
                typeof contentItem.featureImage === 'object' && (
                  <div className="flex-1 p-2.5 md:p-5 lg:p-10">
                    <img
                      src={contentItem.featureImage.url || ''}
                      alt={contentItem.featureImage.alt || contentItem.name}
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                )}
            </div>
          </div>
        )}
        {/* Content Sections */}
        {contentItem.contentSections &&
          contentItem.contentSections.length > 0 && (
            <div id="details">
              {contentItem.contentSections.map((section, index) => (
                <div
                  key={index}
                  className="w-full px-2.5 md:px-5 lg:px-10 border-b border-b-neutral-700"
                >
                  <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto px-2.5 md:px-5 lg:px-10 py-8 sm:py-12 md:py-16 gap-6 sm:gap-8 lg:gap-16 border-x border-x-neutral-700 bg-neutral-800">
                    <div className="flex flex-col lg:w-1/3">
                      {section.tag && (
                        <Tag
                          number={String(index + 1)}
                          text={section.tag}
                          variant="sm"
                        />
                      )}
                      <h2 className="font-aller font-bold text-white text-2xl sm:text-3xl md:text-4xl mt-2 mb-2">
                        {section.name}
                      </h2>
                      {section.shortDescription && (
                        <p className="font-satoshi text-xs sm:text-sm text-neutral-400">
                          {section.shortDescription}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col lg:w-2/3">
                      {section.longDescription && (
                        <div className="font-satoshi text-base sm:text-lg text-neutral-200 leading-relaxed">
                          {renderRichText(section.longDescription)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        <CTASection
          tagNumber={
            '0' + ((contentItem.contentSections?.length ?? 0) + 1).toString()
          }
        />
        <Footer />
      </main>
    </>
  );
}
