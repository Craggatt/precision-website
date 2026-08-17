'use client';

import { useWaitingListStore } from "@/store/waitingListStore";

export default function BookDemoButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setOpen } = useWaitingListStore();

  return (
    <button onClick={() => setOpen(true)} className={className}>
      {children}
    </button>
  );
}
