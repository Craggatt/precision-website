"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@base-ui/react";
import { ArrowRight, X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useWaitingListStore } from "@/store/waitingListStore";
import { motion, AnimatePresence } from "motion/react";
import { Turnstile } from "@marsidev/react-turnstile";

interface WaitingListFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
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

export default function WaitingListForm() {
  const setOpen = useWaitingListStore((s) => s.setOpen);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WaitingListFormValues>();

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

  const onSubmit: SubmitHandler<WaitingListFormValues> = async (data) => {
    try {
      if (!turnstileToken) {
        console.error("Turnstile token not available");
        return;
      }

      const payload = {
        ...data,
        turnstileToken,
      };

      const response = await fetch("/api/waiting-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit waiting list signup");
      }

      reset();
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      setOpen(false);
    } catch (error) {
      console.error("Waiting list form submission error:", error);
      turnstileRef.current?.reset();
    }
  };

  return (
    <div
      className="fixed inset-0 z-20 flex items-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waiting-list-form-title"
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

        <div className="max-w-2xl mx-auto relative">
          {/* Header */}
          <header className="px-5 sm:px-10 pt-6 sm:pt-10 pb-6 sm:pb-8 flex items-start justify-between gap-4 border-b border-neutral-800">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-primary">
                — Join the list
              </span>
              <h2
                id="waiting-list-form-title"
                className="font-aller text-3xl sm:text-4xl font-bold leading-[1.05] tracking-tight"
              >
                Join the waiting list
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base max-w-md mt-1">
                Leave your details and we'll be in touch as soon as a spot
                opens up.
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
            <div className="px-5 sm:px-10 py-8 sm:py-10 flex flex-col gap-6">
              <Field label="Name" htmlFor="name" error={errors.name?.message}>
                <Input
                  id="name"
                  autoComplete="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className={inputClasses}
                />
              </Field>

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

              <div className="flex flex-col sm:flex-row gap-6">
                <Field label="Company" htmlFor="company" hint="Optional">
                  <Input
                    id="company"
                    autoComplete="organization"
                    {...register("company")}
                    className={inputClasses}
                  />
                </Field>
                <Field label="Position" htmlFor="position" hint="Optional">
                  <Input
                    id="position"
                    autoComplete="organization-title"
                    {...register("position")}
                    className={inputClasses}
                  />
                </Field>
              </div>

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
                    {isSubmitting ? "Submitting…" : "Join waiting list"}
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
