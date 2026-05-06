"use client";

import { Input } from "@base-ui/react";
import { ArrowRight } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceSupportFormValues {
  venueName: string;
  contactName: string;
  email: string;
  phone: string;
  signDescription: string;
  serialNumber: string;
  faultDescription: string;
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

export default function ServiceSupportForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ServiceSupportFormValues>();

  const onSubmit: SubmitHandler<ServiceSupportFormValues> = async (data) => {
    console.log("Service support submission:", data);
    // TODO: wire up API call with react-query mutation

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitSuccess(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="p-10">
      <h3 className="font-mono uppercase text-[11px] text-neutral-500 tracking-[0.12em] mb-6">
        Submit Support Request
      </h3>

      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-sm"
          >
            <p className="font-mono text-green-400 text-xs">
              Support request received! We'll get back to you within one business day.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Venue Name */}
        <Field
          label="Venue Name"
          htmlFor="venueName"
          error={errors.venueName?.message}
        >
          <Input
            id="venueName"
            {...register("venueName", {
              required: "Venue name is required",
            })}
            className={inputClasses}
            placeholder="e.g., Crown Casino"
          />
        </Field>

        {/* Contact Details */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Field
            label="Contact Name"
            htmlFor="contactName"
            error={errors.contactName?.message}
          >
            <Input
              id="contactName"
              autoComplete="name"
              {...register("contactName", {
                required: "Contact name is required",
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
        </div>

        {/* Phone */}
        <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register("phone", {
              required: "Phone number is required",
            })}
            className={inputClasses}
            placeholder="+61 2 1234 5678"
          />
        </Field>

        {/* Sign Details */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Field
            label="Sign Description"
            htmlFor="signDescription"
            error={errors.signDescription?.message}
          >
            <Input
              id="signDescription"
              {...register("signDescription", {
                required: "Sign description is required",
              })}
              className={inputClasses}
              placeholder="e.g., Main entrance LED sign"
            />
          </Field>
          <Field
            label="Serial Number"
            htmlFor="serialNumber"
            hint="Optional"
          >
            <Input
              id="serialNumber"
              {...register("serialNumber")}
              className={inputClasses}
              placeholder="Located on the sign label"
            />
          </Field>
        </div>

        {/* Fault Description */}
        <Field
          label="Fault Description"
          htmlFor="faultDescription"
          error={errors.faultDescription?.message}
        >
          <textarea
            id="faultDescription"
            {...register("faultDescription", {
              required: "Fault description is required",
              minLength: {
                value: 10,
                message: "Please provide more details (at least 10 characters)",
              },
            })}
            placeholder="Describe the issue you're experiencing..."
            className={`${inputClasses} resize-y min-h-[7rem] leading-relaxed`}
          />
        </Field>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
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
        </div>
      </form>
    </div>
  );
}
