"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@base-ui/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDemoStore } from "@/store/demoStore";
import { motion, AnimatePresence } from "motion/react";
import {
  useEventSlots,
  useBookSlot,
  parseSlotUtc,
  slotSpotsLeft,
  isSlotStaleError,
  type EventSlot,
  type BookSlotResponse,
} from "@/hooks/useEventBooking";

const EVENT_SLUG = "age-2026";
const SYDNEY_TZ = "Australia/Sydney";

interface DemoBookingValues {
  name: string;
  email: string;
  mobile: string;
}

/* ---------- time formatting (everything shown in AEST) ---------- */

function slotTimeLabel(slot: EventSlot): string {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: SYDNEY_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(parseSlotUtc(slot.start_utc))
    .toUpperCase();
}

function slotSydneyHour(slot: EventSlot): number {
  return Number(
    new Intl.DateTimeFormat("en-AU", {
      timeZone: SYDNEY_TZ,
      hour: "numeric",
      hour12: false,
    }).format(parseSlotUtc(slot.start_utc))
  );
}

/** "2026-08-11" → { weekday: "Tue", day: "11", full: "Tue 11 Aug" } */
function dayLabel(dateKey: string) {
  const d = new Date(`${dateKey}T00:00:00Z`);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-AU", { ...opts, timeZone: "UTC" }).format(d);
  return {
    weekday: fmt({ weekday: "short" }),
    day: fmt({ day: "numeric" }),
    full: fmt({ weekday: "short", day: "numeric", month: "short" }),
  };
}

function groupByPeriod(slots: EventSlot[]) {
  const groups: { label: string; slots: EventSlot[] }[] = [
    { label: "Morning", slots: [] },
    { label: "Afternoon", slots: [] },
    { label: "Evening", slots: [] },
  ];
  for (const slot of slots) {
    const hour = slotSydneyHour(slot);
    if (hour < 12) groups[0].slots.push(slot);
    else if (hour < 17) groups[1].slots.push(slot);
    else groups[2].slots.push(slot);
  }
  return groups.filter((g) => g.slots.length > 0);
}

/* ---------- shared field chrome (same as the quote form) ---------- */

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

/* Step-to-step slide: direction 1 = forward, -1 = back */
const stepVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 32 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -32,
    transition: { duration: 0.2, ease: "easeIn" as const },
  }),
};

/* ---------- step 1: slot picker ---------- */

function SlotPicker({
  selectedSlot,
  onSelect,
  onContinue,
  staleMessage,
}: {
  selectedSlot: EventSlot | null;
  onSelect: (slot: EventSlot) => void;
  onContinue: () => void;
  staleMessage: string | null;
}) {
  const { data, isLoading, isError } = useEventSlots(EVENT_SLUG);
  const days = useMemo(
    () => (data ? Object.keys(data.grid).sort() : []),
    [data]
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const activeDay = selectedDay ?? days[0] ?? null;

  if (isLoading) {
    return (
      <div className="px-5 sm:px-10 py-10 flex flex-col gap-4 animate-pulse">
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-20 h-20 rounded-md bg-neutral-800" />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-14 rounded-md bg-neutral-800" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data || days.length === 0) {
    return (
      <div className="px-5 sm:px-10 py-14 text-center">
        <p className="font-satoshi text-neutral-300">
          Online booking is unavailable right now.
        </p>
        <p className="font-satoshi text-neutral-500 text-sm mt-2">
          Please try again later, or email{" "}
          <a
            href="mailto:sales@precisionsigns.com.au"
            className="text-brand-primary underline underline-offset-2"
          >
            sales@precisionsigns.com.au
          </a>{" "}
          and we&apos;ll arrange a time.
        </p>
      </div>
    );
  }

  const daySlots = activeDay
    ? [...data.grid[activeDay]].sort((a, b) =>
        a.start_utc.localeCompare(b.start_utc)
      )
    : [];
  // Carry a running index across period groups so the entrance stagger
  // flows through the whole day as one sequence
  let runningIndex = 0;
  const periods = groupByPeriod(daySlots).map((period) => {
    const startIndex = runningIndex;
    runningIndex += period.slots.length;
    return { ...period, startIndex };
  });

  return (
    <div className="px-5 sm:px-10 py-8 sm:py-10">
      <div className="flex items-center gap-2 font-satoshi text-neutral-400 text-sm mb-5">
        <Clock size={14} strokeWidth={1.75} />
        {data.slot_minutes} min · times shown in AEST
      </div>

      <AnimatePresence>
        {staleMessage && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-satoshi text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-4 py-3 mb-5"
          >
            {staleMessage}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Day tabs */}
      <div className="flex gap-3">
        {days.map((dateKey) => {
          const { weekday, day } = dayLabel(dateKey);
          const isActive = dateKey === activeDay;
          const count = data.grid[dateKey].length;
          return (
            <motion.button
              key={dateKey}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(dateKey)}
              className={`relative flex flex-col items-center justify-center w-20 h-20 rounded-md border cursor-pointer transition-colors ${
                isActive
                  ? "border-transparent text-white"
                  : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-500"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-day-tab"
                  className="absolute inset-0 rounded-md bg-brand-primary-active border border-brand-primary"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 font-satoshi text-xs">
                {weekday}
              </span>
              <span className="relative z-10 font-aller font-bold text-xl leading-tight">
                {day}
              </span>
              <span
                className={`relative z-10 font-satoshi text-[10px] ${isActive ? "text-white/70" : "text-neutral-500"}`}
              >
                {count} slots
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Slots grouped by period */}
      <div
        key={activeDay}
        className="mt-6 flex flex-col gap-5 border-t border-neutral-800 pt-5"
      >
        {periods.map((period) => (
          <div key={period.label}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: period.startIndex * 0.015 }}
              className="font-mono uppercase text-[11px] text-neutral-500 tracking-[0.12em] mb-2"
            >
              {period.label}
            </motion.p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {period.slots.map((slot, i) => {
                const isSelected = selectedSlot?.id === slot.id;
                const left = slotSpotsLeft(slot);
                return (
                  <motion.button
                    key={slot.id}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: (period.startIndex + i) * 0.015,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => onSelect(slot)}
                    className={`flex flex-col items-center justify-center py-1.5 rounded-md border transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-brand-primary border-brand-primary text-white"
                        : "bg-neutral-800 border-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    <span className="font-aller font-bold text-[13px] leading-tight text-white">
                      {slotTimeLabel(slot)}
                    </span>
                    <span
                      className={`font-satoshi text-[10px] leading-tight ${
                        isSelected
                          ? "text-white/70"
                          : left === 1
                            ? "text-red-400"
                            : "text-neutral-500"
                      }`}
                    >
                      {left} left
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={!selectedSlot}
        onClick={onContinue}
        className="w-full mt-8 font-satoshi font-medium bg-brand-primary text-white py-3.5 rounded-md flex items-center justify-center gap-2 hover:bg-brand-primary-hover transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Enter details
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </div>
  );
}

/* ---------- main modal ---------- */

export default function DemoBookingForm() {
  const setOpen = useDemoStore((s) => s.setOpen);
  const [step, setStep] = useState<"slot" | "details" | "done">("slot");
  const [direction, setDirection] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<EventSlot | null>(null);
  const [staleMessage, setStaleMessage] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<BookSlotResponse | null>(
    null
  );
  const book = useBookSlot(EVENT_SLUG);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemoBookingValues>();

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

  const onSubmit: SubmitHandler<DemoBookingValues> = (data) => {
    if (!selectedSlot || book.isPending) return;
    book.mutate(
      {
        // Exact string from the GET grid — the API requires a byte-for-byte match
        slot_start_utc: selectedSlot.start_utc,
        customer_name: data.name.trim(),
        customer_email: data.email,
        customer_phone: data.mobile || undefined,
      },
      {
        onSuccess: (response) => {
          setConfirmation(response);
          setDirection(1);
          setStep("done");
        },
        onError: (error) => {
          if (isSlotStaleError(error)) {
            // Someone took the slot between picking and confirming
            setSelectedSlot(null);
            setStaleMessage(
              "That time was just booked by someone else — please pick another."
            );
            setDirection(-1);
            setStep("slot");
          }
        },
      }
    );
  };

  const selectedSlotSummary = selectedSlot
    ? `${dayLabel(parseSlotUtcToSydneyDate(selectedSlot)).full} · ${slotTimeLabel(selectedSlot)} AEST`
    : "";

  return (
    <div
      className="fixed inset-0 z-20 flex items-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-booking-title"
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
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-primary/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-brand-primary/5 blur-3xl pointer-events-none" />

        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-neutral-700" />
        </div>

        <div className="max-w-2xl mx-auto relative">
          {/* Header */}
          <header className="px-5 sm:px-10 pt-6 sm:pt-10 pb-6 sm:pb-8 flex items-start justify-between gap-4 border-b border-neutral-800">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-primary">
                — Stand 868 · ICC Sydney
              </span>
              <h2
                id="demo-booking-title"
                className="font-aller text-3xl sm:text-4xl font-bold leading-[1.05] tracking-tight"
              >
                AGE 2026 Demo Booking
              </h2>
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

          <AnimatePresence mode="wait" custom={direction} initial={false}>
          {step === "slot" && (
            <motion.div
              key="step-slot"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <SlotPicker
                selectedSlot={selectedSlot}
                onSelect={(slot) => {
                  setSelectedSlot(slot);
                  setStaleMessage(null);
                }}
                onContinue={() => {
                  if (!selectedSlot) return;
                  setDirection(1);
                  setStep("details");
                }}
                staleMessage={staleMessage}
              />
            </motion.div>
          )}

          {step === "details" && selectedSlot && (
            <motion.form
              key="step-details"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="px-5 sm:px-10 py-8 sm:py-10 flex flex-col gap-6">
                {/* Selected slot summary */}
                <div className="flex items-center justify-between gap-4 bg-neutral-800 border border-neutral-700 rounded-md px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Clock
                      size={15}
                      strokeWidth={1.75}
                      className="text-brand-primary shrink-0"
                    />
                    <span className="font-satoshi text-sm text-neutral-100">
                      {selectedSlotSummary}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDirection(-1);
                      setStep("slot");
                    }}
                    className="flex items-center gap-1.5 font-satoshi text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowLeft size={13} />
                    Change
                  </button>
                </div>

                <Field
                  label="Name"
                  htmlFor="demoName"
                  error={errors.name?.message}
                >
                  <Input
                    id="demoName"
                    autoComplete="name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className={inputClasses}
                  />
                </Field>

                <Field
                  label="Email"
                  htmlFor="demoEmail"
                  error={errors.email?.message}
                >
                  <Input
                    id="demoEmail"
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

                <Field label="Mobile" htmlFor="demoMobile" hint="Optional">
                  <Input
                    id="demoMobile"
                    type="tel"
                    autoComplete="tel"
                    {...register("mobile")}
                    className={inputClasses}
                  />
                </Field>

                {book.isError && !isSlotStaleError(book.error) && (
                  <p className="font-satoshi text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-4 py-3">
                    {book.error.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={book.isPending}
                  className="w-full font-satoshi font-medium bg-brand-primary text-white py-3.5 rounded-md flex items-center justify-center gap-2 hover:bg-brand-primary-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {book.isPending ? "Booking…" : "Confirm booking"}
                  <ArrowRight size={16} strokeWidth={2} />
                </button>
              </div>
            </motion.form>
          )}

          {step === "done" && confirmation && (
            <motion.div
              key="step-done"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="px-5 sm:px-10 py-12 sm:py-16 flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  duration: 0.7,
                  delay: 0.1,
                }}
              >
                <CheckCircle2
                  size={44}
                  strokeWidth={1.5}
                  className="text-brand-primary mb-5"
                />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25, ease: "easeOut" }}
                className="font-aller font-bold text-white text-2xl sm:text-3xl"
              >
                You&apos;re booked
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
                className="font-satoshi text-neutral-300 mt-3"
              >
                {confirmation.event_name} ·{" "}
                {dayLabel(
                  sydneyDateKey(confirmation.slot_start_utc)
                ).full}{" "}
                ·{" "}
                {new Intl.DateTimeFormat("en-AU", {
                  timeZone: SYDNEY_TZ,
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
                  .format(parseSlotUtc(confirmation.slot_start_utc))
                  .toUpperCase()}{" "}
                AEST
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.45, ease: "easeOut" }}
                className="font-satoshi text-neutral-500 text-sm mt-4 max-w-sm"
              >
                A confirmation email with a calendar invite and a
                reschedule link is on its way to you.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.55, ease: "easeOut" }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setOpen(false)}
                className="font-satoshi font-medium bg-brand-primary text-white px-8 py-3 rounded-md hover:bg-brand-primary-hover transition-colors cursor-pointer mt-8"
              >
                Done
              </motion.button>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/** Sydney calendar date key ("2026-08-11") for a slot's start time. */
function sydneyDateKey(naiveUtc: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SYDNEY_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parseSlotUtc(naiveUtc));
  return parts; // en-CA formats as YYYY-MM-DD
}

function parseSlotUtcToSydneyDate(slot: EventSlot): string {
  return sydneyDateKey(slot.start_utc);
}
