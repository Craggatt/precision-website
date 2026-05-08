import React from "react";
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
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
          {index < items.length - 1 && <span className="text-neutral-600">/</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
