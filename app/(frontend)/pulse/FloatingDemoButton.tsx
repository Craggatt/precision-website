'use client';

import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';
import { CalendarClock } from 'lucide-react';
import { useState } from 'react';
import { useWaitingListStore } from '@/store/waitingListStore';


export default function FloatingDemoButton() {
  const { setOpen } = useWaitingListStore();
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  // Hero already has its own Book My Demo button — float in once it scrolls away
  useMotionValueEvent(scrollY, 'change', y => setVisible(y > 400));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-10 flex items-center gap-2.5 font-satoshi font-medium! text-sm text-white bg-brand-primary hover:bg-brand-primary-hover px-5 py-3 rounded shadow transition-colors cursor-pointer"
        >
          Join Waiting List
          <CalendarClock size={16} strokeWidth={1.75} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
