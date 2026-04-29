"use client";

import { Checkbox, Input } from "@base-ui/react";
import { Button } from "./Button";
import { ArrowRight, CheckIcon, X } from "lucide-react";
import { wesbiteData } from "@/data/products";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuoteStore } from "@/store/quoteStore";
import { motion } from "motion/react";
import Aurora from "./Aurora";

interface QuoteFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalInfo: string;
}

function ProductRow({
  product,
}: {
  product: (typeof wesbiteData.products)[0];
}) {
  const isSelected = useQuoteStore((s) => s.isSelected(product.slug));
  const toggleProduct = useQuoteStore((s) => s.toggleProduct);
  return (
    <div className="bg-neutral-900/50 flex flex-row gap-3 py-2 px-3 items-center">
      <Checkbox.Root
        checked={isSelected}
        onCheckedChange={() => toggleProduct(product)}
        className="flex size-6 items-center justify-center rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-checked:bg-brand-primary data-unchecked:border data-unchecked:border-neutral-600"
      >
        <Checkbox.Indicator className="flex text-gray-50 data-unchecked:hidden">
          <CheckIcon className="size-5" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <p className="font-aller text-lg">{product.name}</p>
    </div>
  );
}

export default function QuoteForm() {
  const products = wesbiteData.products;
  const selectedProducts = useQuoteStore((s) => s.selectedProducts);
  const setOpen = useQuoteStore((s) => s.setOpen);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>();

  const onSubmit: SubmitHandler<QuoteFormValues> = async (data) => {
    const payload = {
      ...data,
      products: selectedProducts.map((p) => p.slug),
    };
    console.log("Quote submission:", payload);
    // TODO: wire up API call with react-query mutation
    reset();
  };

  return (
    <div
      className="fixed bottom-0 left-0 h-screen w-screen z-20 pt-14 "
      onClick={() => setOpen(false)}
    >
      <motion.div
        className="w-full h-full backdrop-blur-lg relative flex flex-col-reverse z-30"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="bg-neutral-800 w-full px-2.5 md:px-5  lg:px-10 border-t border-t-neutral-700"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0.8, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.8, y: 500 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="max-w-[1600px] mx-auto border-x border-x-neutral-700">
            <div className="p-10 border-b border-b-neutral-700 relative">
              <h2 className="font-aller text-4xl font-bold">Request a Quote</h2>
              <X
                className="absolute top-5 right-5 text-neutral-500"
                onClick={() => setOpen(false)}
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row">
                <div className="flex-1 p-10 border-r border-r-neutral-700">
                  <h3 className="font-mono uppercase text-lg text-neutral-500">
                    Select Products (optional)
                  </h3>
                  <div className="h-full  w-full relative overflow-y-scroll scrollbar-thin">
                    <div className="absolute inset-0 flex flex-col gap-1 mb-10">
                      {products.map((product) => (
                        <ProductRow key={product.slug} product={product} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-10 flex flex-col gap-4">
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col flex-1">
                      <label className="font-mono uppercase text-lg text-neutral-500">
                        FIRST NAME
                      </label>
                      <Input
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className="bg-neutral-900/50 border-b border-b-neutral-600 text-lg px-3 py-2 font-mono"
                      />
                      {errors.firstName && (
                        <span className="text-red-400 text-sm font-mono mt-1">
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1">
                      <label className="font-mono uppercase text-lg text-neutral-500">
                        LAST NAME
                      </label>
                      <Input
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className="bg-neutral-900/50 border-b border-b-neutral-600 text-lg px-3 py-2 font-mono text-neutral-300"
                      />
                      {errors.lastName && (
                        <span className="text-red-400 text-sm font-mono mt-1">
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col flex-1">
                      <label className="font-mono uppercase text-lg text-neutral-500">
                        EMAIL
                      </label>
                      <Input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email",
                          },
                        })}
                        className="bg-neutral-900/50 border-b border-b-neutral-600 text-lg px-3 py-2 font-mono"
                      />
                      {errors.email && (
                        <span className="text-red-400 text-sm font-mono mt-1">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col flex-1">
                      <label className="font-mono uppercase text-lg text-neutral-500">
                        PHONE NUMBER
                      </label>
                      <Input
                        {...register("phone")}
                        className="bg-neutral-900/50 border-b border-b-neutral-600 text-lg px-3 py-2 font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col flex-1">
                      <label className="font-mono uppercase text-lg text-neutral-500">
                        ADDITIONAL INFORMATION
                      </label>
                      <textarea
                        {...register("additionalInfo")}
                        className="bg-neutral-900/50 border-b border-b-neutral-600 text-lg px-3 py-2 font-mono"
                      />
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="font-satoshi text bg-brand-primary text-white px-5 py-2.5 rounded-sm hover:bg-neutral-200 transition-colors font-medium flex items-center gap-200 text-center w-full justify-center disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                      <ArrowRight size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
