import { notFound } from "next/navigation";
import React from "react";
import { payloadService } from "@/services/payloadService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Content, ContentCategory, ContentSubcategory } from "@/payload-types";

type Params = Promise<{ slug: string }>;

/* ----------------------------- helpers ----------------------------- */

function getCategoryName(content: Content): string {
  return typeof content.category === "object" ? (content.category as ContentCategory).name : "";
}

function getSubcategoryName(content: Content): string | null {
  const subs = content.subcategory;
  if (!subs || subs.length === 0) return null;
  const first = subs[0];
  return typeof first === "object" ? (first as ContentSubcategory).name : null;
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
  if (node.type === "text") {
    let el: React.ReactNode = node.text ?? "";
    if ((node.format ?? 0) & 1)
      el = (
        <strong key={`b-${key}`} className="text-white font-semibold">
          {el}
        </strong>
      );
    if ((node.format ?? 0) & 2) el = <em key={`i-${key}`}>{el}</em>;
    return el;
  }
  if (node.type === "linebreak") return <br key={key} />;

  const children = (node.children ?? []).map((child, i) => renderNode(child, i));

  switch (node.type) {
    case "paragraph":
      return (
        <p
          key={key}
          className="font-satoshi text-neutral-300 leading-[1.7] mb-4 last:mb-0"
        >
          {children}
        </p>
      );
    case "heading":
      return (
        <h3 key={key} className="font-aller font-bold text-white text-2xl mb-4 mt-8 first:mt-0">
          {children}
        </h3>
      );
    case "list":
      return node.listType === "number" ? (
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
    case "listitem":
      return <li key={key}>{children}</li>;
    default:
      return <div key={key}>{children}</div>;
  }
}

function renderRichText(richTextData: any): React.ReactNode {
  if (!richTextData?.root?.children) return null;
  return richTextData.root.children.map((node: LexicalNode, i: number) => renderNode(node, i));
}

/* ----------------------------- main component ----------------------------- */

export default async function ContentDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [contentItem, products, productCategories, allContent, contentCategories] = await Promise.all([
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
        <div className="px-10 border-b border-b-neutral-700 flex flex-col">
          <div className="max-w-[1600px] mt-12.5 mx-auto p-10 w-full flex-1">
            <div className="flex items-center gap-2 mb-4">
              <a
                href="/content"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-brand-primary transition-colors"
              >
                Content
              </a>
              <span className="text-neutral-600">/</span>
              {categoryName && (
                <>
                  <a
                    href={`/content?cat=${encodeURIComponent(categoryName)}`}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-brand-primary transition-colors"
                  >
                    {categoryName}
                  </a>
                  {subcategoryName && (
                    <>
                      <span className="text-neutral-600">/</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                        {subcategoryName}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>

            <h1 className="font-aller font-bold text-5xl mt-3">
              {contentItem.name}
            </h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 px-2.5 md:px-5 lg:px-10">
          <div className="max-w-[1600px] mx-auto border-x border-neutral-700 bg-neutral-800/30">
            <div className="p-10">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-invert max-w-none">
                  {renderRichText(contentItem.richText)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
