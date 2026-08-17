'use client';

import { useDemoStore } from '@/store/demoStore';

export default function BookDemoButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setOpen } = useDemoStore();

  return (
    <button onClick={() => setOpen(true)} className={className}>
      {children}
    </button>
  );
}
