import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import ProductsClient from "./ProductsClient";
import { payloadService } from "@/services/payloadService";

export default async function Products() {
  const [products, productCategories, content, contentCategories] = await Promise.all([
    payloadService.getProducts(),
    payloadService.getProductCategories(),
    payloadService.getContent(),
    payloadService.getContentCategories(),
  ]);

  return (
    <>
      <main className="min-h-screen h-screen bg-neutral-900 flex flex-col">
        <Navbar ready={true} products={products} productCategories={productCategories} content={content} contentCategories={contentCategories} />
        <div className="px-4 sm:px-6 md:px-10 border-b border-b-neutral-700 flex flex-col pt-20 sm:pt-24">
          <div className="max-w-[1600px] mx-auto p-4 sm:p-6 md:p-10 w-full flex-1">
            <h1 className="font-aller font-bold text-3xl sm:text-4xl md:text-5xl">Products</h1>
            <p className="font-satoshi text-neutral-400 text-xs sm:text-sm mt-2">
              Gaming signage and display solutions from Precision Signs
            </p>
          </div>
        </div>
        <Suspense>
          <ProductsClient products={products} categories={productCategories} />
        </Suspense>
      </main>
    </>
  );
}
