'use client';

import { track } from '@vercel/analytics';
import InfiniteImageScroll from '@/components/InfiniteImageScroll';

export default function ProjectGallery({ images }: { images: string[] }) {
  return (
    <InfiniteImageScroll
      images={images}
      onImageClick={() =>
        track('Project Activity', { page: window.location.pathname })
      }
    />
  );
}
