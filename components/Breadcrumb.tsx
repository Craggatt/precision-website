import React from 'react';
import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="pt-14 sm:pt-16 border-b border-neutral-700 px-2.5 sm:px-5 md:px-10">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-brand-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                  {item.label}
                </span>
              )}
              {index < items.length - 1 && (
                <span className="text-neutral-600">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
