'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface HorizontalScrollProps {
  children: ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement;

      const verticalScrollContainer = target.closest('[data-vertical-scroll]');

      if (verticalScrollContainer) {
        return;
      }

      event.preventDefault();
      container.scrollLeft += event.deltaY;
    };

    window.addEventListener('wheel', handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-screen w-screen overflow-x-auto overflow-y-hidden scroll-smooth"
    >
      {children}
    </div>
  );
}
