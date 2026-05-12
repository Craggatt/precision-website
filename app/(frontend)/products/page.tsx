import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import ProductsClient from './ProductsClient';
import { payloadService } from '@/services/payloadService';
import Heading from '@/components/Heading';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';
import QuoteFormSection from '@/components/sections/QuoteFormSection';

export default async function Products() {
  const [products, productCategories, content, contentCategories] =
    await Promise.all([
      payloadService.getProducts(),
      payloadService.getProductCategories(),
      payloadService.getContent(),
      payloadService.getContentCategories(),
    ]);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
  ];

  return (
    <>
      <main className="min-h-screen h-screen bg-neutral-900 flex flex-col">
        <Navbar
          ready={true}
          products={products}
          productCategories={productCategories}
          content={content}
          contentCategories={contentCategories}
        />
        <Breadcrumb items={breadcrumbItems} />
        <Heading
          headingText="Products"
          secondaryText="Gaming signage and display solutions from Precision Signs"
        />
        <Suspense>
          <ProductsClient products={products} categories={productCategories} />
        </Suspense>
        <QuoteFormSection />
      </main>
    </>
  );
}
