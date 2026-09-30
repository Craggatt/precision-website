"use client";

import { useEffect, useState, useRef } from "react";
import { Checkbox, Input } from "@base-ui/react";
import { ArrowRight, CheckIcon, X } from "lucide-react";
import { wesbiteData } from "@/data/products";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuoteStore } from "@/store/quoteStore";
import { motion, AnimatePresence } from "motion/react";
import { Turnstile } from "@marsidev/react-turnstile";

interface QuoteFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  venue: string;
  additionalInfo: string;
}

function ProductRow({
  product,
  index,
}: {
  product: (typeof wesbiteData.products)[0];
  index: number;
}) {
  const isSelected = useQuoteStore((s) => s.isSelected(product.slug));
  const toggleProduct = useQuoteStore((s) => s.toggleProduct);

  return (
    <motion.label
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: 0.15 + index * 0.02, ease: "easeOut" }}
      className={`group relative flex flex-row gap-3 py-2.5 px-3 items-center cursor-pointer rounded-sm border transition-all duration-200
        ${
          isSelected
            ? "bg-brand-primary/10 border-brand-primary/40"
            : "bg-neutral-900/40 border-transparent hover:bg-neutral-900/80 hover:border-neutral-700"
        }`}
    >
      <Checkbox.Root
        checked={isSelected}
        onCheckedChange={() => toggleProduct(product)}
        className="flex size-[18px] items-center justify-center rounded-[3px] shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary data-checked:bg-brand-primary data-unchecked:border data-unchecked:border-neutral-600 group-hover:data-unchecked:border-neutral-400"
      >
        <Checkbox.Indicator className="flex text-white data-unchecked:hidden">
          <CheckIcon className="size-3.5" strokeWidth={3} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span
        className={`font-aller text-[15px] tracking-tight transition-colors ${
          isSelected ? "text-white" : "text-neutral-300"
        }`}
      >
        {product.name}
      </span>
    </motion.label>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 min-w-0 group">
      <div className="flex items-baseline justify-between mb-1.5">
        <label
          htmlFor={htmlFor}
          className="font-mono uppercase text-[11px] text-neutral-500 tracking-[0.12em] group-focus-within:text-brand-primary transition-colors"
        >
          {label}
        </label>
        {hint && (
          <span className="font-mono text-[10px] text-neutral-600 tracking-wider uppercase">
            {hint}
          </span>
        )}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-red-400 text-xs font-mono mt-1.5"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClasses =
  "bg-neutral-800 border-b border-b-neutral-700 hover:border-b-neutral-500 focus:border-b-brand-primary focus:outline-none transition-colors text-[15px] px-2.5 py-2.5 font-mono text-neutral-100 placeholder:text-neutral-600 w-full";

export default function QuoteForm() {
  const products = wesbiteData.products;
  const selectedProducts = useQuoteStore((s) => s.selectedProducts);
  const setOpen = useQuoteStore((s) => s.setOpen);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [setOpen]);

  const onSubmit: SubmitHandler<QuoteFormValues> = async (data) => {
    try {
      if (!turnstileToken) {
        console.error("Turnstile token not available");
        return;
      }

      const payload = {
        ...data,
        products: selectedProducts.map((p) => p.slug),
        turnstileToken,
      };

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request");
      }

      reset();
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      setOpen(false);

      // You could add a success notification here if needed
    } catch (error) {
      console.error("Quote form submission error:", error);
      turnstileRef.current?.reset();
      // You could add error state handling here if needed
    }
  };

  const selectedCount = selectedProducts.length;

  return (
    <div
      className="fixed inset-0 z-20 flex items-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-form-title"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setOpen(false)}
      />

      {/* Sheet */}
      <motion.div
        className="relative w-full bg-neutral-900 max-h-[92vh] sm:max-h-[90vh] overflow-y-auto z-30 rounded-t-2xl sm:rounded-t-3xl shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)] border-t border-neutral-700/50"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Subtle grain / glow accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-brand-primary/5 blur-3xl pointer-events-none" />

        {/* Drag handle (visual cue, mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-neutral-700" />
        </div>

        <div className="max-w-[1400px] mx-auto relative">
          {/* Header */}
          <header className="px-5 sm:px-10 lg:px-14 pt-6 sm:pt-10 pb-6 sm:pb-8 flex items-start justify-between gap-4 border-b border-neutral-800">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-primary">
                — Get in touch
              </span>
              <h2
                id="quote-form-title"
                className="font-aller text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight"
              >
                Request a quote
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base max-w-md mt-1">
                Tell us what you're after. We'll get back to you within one
                business day.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="text-neutral-500 hover:text-white hover:bg-neutral-800 transition-all p-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary shrink-0"
            >
              <X size={20} />
            </button>
          </header>

          {/* Body */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              {/* Products */}
              <div className="px-5 sm:px-10 lg:px-14 py-8 lg:py-12 border-b lg:border-b-0 lg:border-r border-neutral-800 bg-neutral-900/50">
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className="font-mono uppercase text-[11px] text-neutral-500 tracking-[0.12em]">
                    01 — Products
                  </h3>
                  <AnimatePresence mode="wait">
                    {selectedCount > 0 ? (
                      <motion.span
                        key="count"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="font-mono text-[11px] text-brand-primary tracking-wider"
                      >
                        {String(selectedCount).padStart(2, "0")} SELECTED
                      </motion.span>
                    ) : (
                      <motion.span
                        key="optional"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-[10px] text-neutral-600 tracking-wider uppercase"
                      >
                        Optional
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  className="flex flex-col gap-1.5 max-h-[20rem] lg:max-h-[32rem] overflow-y-auto scrollbar-thin pr-1 -mr-1"
                  onWheel={(e) => {
                    const target = e.currentTarget;
                    const isScrollable = target.scrollHeight > target.clientHeight;
                    const isAtTop = target.scrollTop === 0;
                    const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight;

                    // Prevent scroll propagation when scrolling within bounds
                    if (isScrollable &&
                        ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom))) {
                      e.stopPropagation();
                    }
                  }}
                >
                  {products.map((product, i) => (
                    <ProductRow key={product.slug} product={product} index={i} />
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div className="px-5 sm:px-10 lg:px-14 py-8 lg:py-12 flex flex-col gap-6">
                <h3 className="font-mono uppercase text-[11px] text-neutral-500 tracking-[0.12em]">
                  02 — Your details
                </h3>

                <div className="flex flex-col sm:flex-row gap-6">
                  <Field
                    label="First Name"
                    htmlFor="firstName"
                    error={errors.firstName?.message}
                  >
                    <Input
                      id="firstName"
                      autoComplete="given-name"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className={inputClasses}
                    />
                  </Field>
                  <Field
                    label="Last Name"
                    htmlFor="lastName"
                    error={errors.lastName?.message}
                  >
                    <Input
                      id="lastName"
                      autoComplete="family-name"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className={inputClasses}
                    />
                  </Field>
                </div>

                <Field
                  label="Email"
                  htmlFor="email"
                  error={errors.email?.message}
                >
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                    className={inputClasses}
                  />
                </Field>

                <Field label="Phone" htmlFor="phone" hint="Optional">
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    className={inputClasses}
                  />
                </Field>

                <Field label="Venue Name" htmlFor="venue" hint="Optional">
                  <Input
                    id="venue"
                    type="text"
                    {...register("venue")}
                    className={inputClasses}
                  />
                </Field>

                <Field
                  label="Additional Information"
                  htmlFor="additionalInfo"
                  hint="Optional"
                >
                  <textarea
                    id="additionalInfo"
                    rows={4}
                    placeholder="Project scope, timeline, quantities..."
                    {...register("additionalInfo")}
                    className={`${inputClasses} resize-y min-h-[7rem] leading-relaxed`}
                  />
                </Field>

                {/* Turnstile (Invisible) */}
                <div className="hidden">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                    options={{
                      theme: "dark",
                      size: "invisible",
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className="group relative font-satoshi bg-brand-primary text-white px-4 py-2 rounded-sm font-medium flex items-center gap-2.5 justify-center sm:justify-between sm:w-auto w-full overflow-hidden transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 tracking-wide">
                      {isSubmitting ? "Submitting…" : "Submit request"}
                    </span>
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                    />
                    <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                  {/* <p className="font-mono text-[11px] text-neutral-500 tracking-wide">
                    By submitting, you agree to our{" "}
                    <span className="text-neutral-300 underline underline-offset-2 decoration-neutral-700 hover:decoration-brand-primary cursor-pointer">
                      privacy policy
                    </span>
                    .
                  </p> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}