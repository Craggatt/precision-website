import { notFound } from 'next/navigation';
import React from 'react';
import { payloadService } from '@/services/payloadService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteFormSection from '@/components/sections/QuoteFormSection';
import CTASection from '@/components/sections/CTASection';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';
import ProjectGallery from './ProjectGallery';
import { Media } from '@/payload-types';
import type { Metadata } from 'next';

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

/* ----------------------------- helpers ----------------------------- */

function getImageUrl(
  media: { relationTo: string; value: number | Media } | null | undefined
): string | null {
  if (!media || typeof media.value !== 'object') return null;
  return (media.value as Media).url ?? null;
}

function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

/* ----------------------------- metadata ----------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await payloadService.getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const imageUrl = getImageUrl(project.featuredImage);

  let plainDescription = '';
  if (project.description?.root?.children) {
    const extractText = (node: LexicalNode): string => {
      if (node.type === 'text') return node.text || '';
      if (node.children) {
        return node.children.map(extractText).join(' ');
      }
      return '';
    };
    plainDescription = project.description.root.children
      .map(extractText)
      .join(' ')
      .slice(0, 160);
  }

  const description =
    plainDescription ||
    `${project.name} - a signage installation by Precision Signs.`;

  return {
    title: project.name,
    description,
    openGraph: {
      title: project.name,
      description,
      type: 'article',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: project.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
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
          className="list-decimal list-inside space-y-1.5 mb-4 marker:text-brand-primary"
        >
          {children}
        </ol>
      ) : (
        <ul
          key={key}
          className="list-disc list-inside space-y-1.5 mb-4 marker:text-brand-primary"
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

function RichText({ content }: { content: NonNullable<Awaited<ReturnType<typeof payloadService.getProjectBySlug>>>['description'] }) {
  if (!content?.root?.children) return null;
  return <>{(content.root.children as LexicalNode[]).map((node, i) => renderNode(node, i))}</>;
}

/* ----------------------------- page ----------------------------- */

export default async function ProjectDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  const [
    project,
    products,
    productCategories,
    content,
    contentCategories,
    projects,
  ] = await Promise.all([
    payloadService.getProjectBySlug(slug),
    payloadService.getProducts(),
    payloadService.getProductCategories(),
    payloadService.getContent(),
    payloadService.getContentCategories(),
    payloadService.getProjects(),
  ]);

  if (!project) notFound();

  const imageUrl = getImageUrl(project.featuredImage);
  const galleryUrls =
    project.gallery
      ?.map(entry => getImageUrl(entry))
      .filter((url): url is string => url !== null) ?? [];

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.name },
  ];

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex flex-col">
      <Navbar
        ready={true}
        products={products}
        productCategories={productCategories}
        content={content}
        contentCategories={contentCategories}
        projects={projects}
      />

      <Breadcrumb items={breadcrumbItems} />

      {/* ============== Hero ============== */}
      <section className="border-b border-neutral-800">
        <div className="max-w-[1600px] mx-auto px-2.5 md:px-5 lg:px-10 py-10 lg:py-16">
          <h1 className="font-aller font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-8">
            {project.name}
          </h1>

          {/* ============== Video ============== */}
          {project.videoUrl && (
            <div className="relative w-full aspect-video bg-black overflow-hidden rounded-sm mb-8">
              {isDirectVideoFile(project.videoUrl) ? (
                <video
                  src={project.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={project.videoUrl}
                  title={`${project.name} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="lg:w-2/3">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover rounded-sm"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-neutral-800 flex items-center justify-center rounded-sm">
                  <span className="font-mono text-neutral-600 text-xs uppercase tracking-widest">
                    No image available
                  </span>
                </div>
              )}
            </div>

            {project.description && (
              <div className="lg:w-1/3">
                <RichText content={project.description} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============== Gallery ============== */}
      {galleryUrls.length > 0 && (
        <section className="border-b border-neutral-800 bg-neutral-900/30">
          <div className="max-w-[1600px] mx-auto px-2.5 md:px-5 lg:px-10 py-16 lg:py-20">
            <ProjectGallery images={galleryUrls} />
          </div>
        </section>
      )}

      <CTASection tagNumber="01" />
      <Footer />
      <QuoteFormSection />
    </main>
  );
}
