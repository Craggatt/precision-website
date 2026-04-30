import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import ProductsClient from "./ProductsClient";
import Footer from "@/components/Footer";

export default function Products() {
  return (
    <>
      <main className="min-h-screen h-screen bg-neutral-900 flex flex-col">
        <Navbar ready={true} products={[]} productCategories={[]} />
        <div className="px-10 border-b border-b-neutral-700 flex flex-col">
          <div className="max-w-[1600px] mt-12.5 mx-auto p-10 w-full flex-1">
            <h1 className="font-aller font-bold text-5xl">Products</h1>
            <p className="font-satoshi text-neutral-400 text-sm mt-2">
              Gaming signage and display solutions from Precision Signs
            </p>
          </div>
        </div>
        <Suspense>
          <ProductsClient />
        </Suspense>
      </main>
    </>
  );
}
