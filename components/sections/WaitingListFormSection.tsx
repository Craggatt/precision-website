'use client';

import { AnimatePresence } from 'motion/react';
import WaitingListForm from '../WaitingListForm';
import { useWaitingListStore } from '@/store/waitingListStore';

export default function WaitingListFormSection() {
  const open = useWaitingListStore(s => s.open);

  return <AnimatePresence>{open && <WaitingListForm />}</AnimatePresence>;
}
