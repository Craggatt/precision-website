"use client";

import { AnimatePresence } from "motion/react";
import DemoBookingForm from "../DemoBookingForm";
import { useDemoStore } from "@/store/demoStore";

export default function DemoFormSection() {
  const open = useDemoStore((s) => s.open);

  return <AnimatePresence>{open && <DemoBookingForm />}</AnimatePresence>;
}
