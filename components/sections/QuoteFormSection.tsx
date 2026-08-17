'use client';

import { AnimatePresence } from 'motion/react';
import QuoteForm from '../QuoteForm';
import { useQuoteStore } from '@/store/quoteStore';

export default function QuoteFormSection() {
  const open = useQuoteStore(s => s.open);

  return <AnimatePresence>{open && <QuoteForm />}</AnimatePresence>;
}
