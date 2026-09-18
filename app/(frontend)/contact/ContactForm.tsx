'use client';

import { Input } from '@base-ui/react';
import { ArrowRight } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Turnstile } from '@marsidev/react-turnstile';
//test comment
interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
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
  'bg-neutral-800 border-b border-b-neutral-700 hover:border-b-neutral-500 focus:border-b-brand-primary focus:outline-none transition-colors text-sm sm:text-[15px] px-2 sm:px-2.5 py-2 sm:py-2.5 font-mono text-neutral-100 placeholder:text-neutral-600 w-full';

export default function ContactForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async data => {
    try {
      if (!turnstileToken) {
        console.error('Turnstile token not available');
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
      reset();
      setTurnstileToken(null);
      turnstileRef.current?.reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      turnstileRef.current?.reset();
      // You could add error state handling here if needed
    }
  };

  return (
    <div className="py-10 px-2.5 md:px-5 lg:px-10 ">
      <h3 className="font-mono uppercase text-[10px] sm:text-[11px] text-neutral-500 tracking-[0.12em] mb-4 sm:mb-6">
        Send us a Message
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
              Thank you for your message! We'll get back to you as soon as
              possible.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 sm:gap-6"
      >
        {/* Name Fields */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Field
            label="First Name"
            htmlFor="firstName"
            error={errors.firstName?.message}
          >
            <Input
              id="firstName"
              autoComplete="given-name"
              {...register('firstName', {
                required: 'First name is required',
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
              {...register('lastName', {
                required: 'Last name is required',
              })}
              className={inputClasses}
            />
          </Field>
        </div>

        {/* Email */}
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email',
              },
            })}
            className={inputClasses}
          />
        </Field>

        {/* Phone */}
        <Field label="Phone" htmlFor="phone" hint="Optional">
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            className={inputClasses}
          />
        </Field>

        {/* Subject */}
        <Field
          label="Subject"
          htmlFor="subject"
          error={errors.subject?.message}
        >
          <Input
            id="subject"
            {...register('subject', {
              required: 'Subject is required',
            })}
            className={inputClasses}
          />
        </Field>

        {/* Message */}
        <Field
          label="Message"
          htmlFor="message"
          error={errors.message?.message}
        >
          <textarea
            id="message"
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters',
              },
            })}
            placeholder="Tell us about your project or inquiry..."
            className={`${inputClasses} resize-y min-h-[7rem] leading-relaxed`}
          />
        </Field>

        {/* Turnstile (Invisible) */}
        <div className="hidden">
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
            onSuccess={token => setTurnstileToken(token)}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
            options={{
              theme: 'dark',
              size: 'invisible',
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-1 sm:mt-2 pt-1 sm:pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            className="group relative font-satoshi bg-brand-primary text-white px-4 py-2.5 sm:py-2 rounded-sm font-medium flex items-center gap-2.5 justify-center sm:justify-between sm:w-auto w-full overflow-hidden transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <span className="relative z-10 tracking-wide">
              {isSubmitting ? 'Sending…' : 'Send message'}
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
