'use client';

import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useDemoStore } from '@/store/demoStore';
import AgeLogo from './AgeLogo';

const challengePoints = [
  'Multiple gaming displays updated in under 60 seconds',
  'Live deployment',
  'Live approvals',
  'Live content creation',
];

// Each bullet's horizontal offset (md+ only), derived from the ring's chord
// width at that item's height, so the list hugs the circle's actual curve.
// Negative values tuck into the ring's bounding box at its rounded corners.
const curveOffsets = [-40, -8, -5, -20];

// ICC Sydney — 14 Darling Drive, Darling Harbour
const ICC_SYDNEY = { lat: -33.8748, lng: 151.1996 };

// Dark style using the site's neutral tokens:
// land = neutral-800, water = neutral-900, roads = neutral-700, labels = neutral-500
const darkMapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#1f2328' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6f7782' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1f2328' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#242930' }] },
  { featureType: 'poi.park', elementType: 'labels', stylers: [{ visibility: 'on' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#4b525c' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2f343a' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#6f7782' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3a4046' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#2f343a' }] },
  { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#282d33' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#14171a' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4b525c' }] },
];

function GoogleMapBackdrop() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const el = mapRef.current;
    if (!key || !el) return;

    let cancelled = false;
    const init = () => {
      if (cancelled) return;
      const g = (window as unknown as { google: any }).google;
      new g.maps.Map(el, {
        center: ICC_SYDNEY,
        zoom: 14,
        disableDefaultUI: true,
        gestureHandling: 'none',
        keyboardShortcuts: false,
        clickableIcons: false,
        backgroundColor: '#14171a',
        styles: darkMapStyles,
      });
    };

    if ((window as unknown as { google?: any }).google?.maps?.Map) {
      init();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps]'
    );
    const script = existing ?? document.createElement('script');
    script.addEventListener('load', init);
    if (!existing) {
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
      script.async = true;
      script.dataset.googleMaps = 'true';
      document.head.appendChild(script);
    }
    return () => {
      cancelled = true;
      script.removeEventListener('load', init);
    };
  }, []);

  return <div ref={mapRef} className="absolute inset-0" />;
}

function AgeMarquee({ direction = 'left' }: { direction?: 'left' | 'right' }) {
  const items = Array(10).fill(null);

  return (
    <div className="bg-brand-primary overflow-hidden whitespace-nowrap py-3 md:py-4">
      <div
        className={`inline-flex ${direction === 'left' ? 'animate-scroll' : 'animate-scroll-right'}`}
      >
        {items.map((_, i) => (
          <div key={i} className="flex items-center shrink-0 gap-5 mx-6 md:mx-8">
            <span className="font-aller font-bold text-white text-2xl md:text-3xl">
              SEE IT LIVE @
            </span>
            <AgeLogo className="h-7 md:h-9 w-auto text-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CountdownRing({ active }: { active: boolean }) {
  const [count, setCount] = useState(60);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setCount((c) => (c <= 1 ? 60 : c - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [active]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - count / 60);

  return (
    <div className="relative w-44 h-44 md:w-52 md:h-52 shrink-0">
      <div className="absolute inset-3 rounded-full bg-neutral-800" />
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#2f343a"
          strokeWidth="4"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#0b6fd3"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-aller text-neutral-300 text-6xl md:text-7xl leading-none tabular-nums">
          {count}
        </span>
      </div>
    </div>
  );
}

export default function AgeChallengeSection() {
  const { setOpen } = useDemoStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section ref={ref} className="bg-neutral-900">
      <AgeMarquee direction="left" />

      <div className="px-2.5 md:px-5 lg:px-10">
        <div className="max-w-[1600px] mx-auto border-x border-neutral-700">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Map */}
            <div className="relative min-h-90 lg:min-h-155 overflow-hidden bg-neutral-800 border-b lg:border-b-0 lg:border-r border-neutral-700">
              <GoogleMapBackdrop />
              {/* AGE map pin */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center z-10 pointer-events-none"
              >
                <div className="bg-brand-primary rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-[0_8px_30px_rgba(11,111,211,0.45)]">
                  <AgeLogo className="w-9 md:w-11 text-white" />
                </div>
                <div className="w-0 h-0 border-l-10 border-r-10 border-l-transparent border-r-transparent border-t-14 border-t-brand-primary -mt-px" />
              </motion.div>
            </div>

            {/* Challenge content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="px-5 md:px-10 py-16 md:py-20 flex flex-col items-center text-center"
            >
              <p className="font-aller font-bold text-neutral-300 text-xl md:text-2xl leading-tight mb-2">
                See Pulse Live At AGE 2026
              </p>
              <h2 className="font-aller font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight uppercase max-w-xl">
                The 60-Second Gaming Floor Challenge
              </h2>

              <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center gap-8 md:gap-5">
                <CountdownRing active={isInView} />
                <ul className="flex flex-col gap-4 text-left">
                  {challengePoints.map((point, index) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + index * 0.1,
                        ease: 'easeOut',
                      }}
                      style={
                        { '--curve': `${curveOffsets[index]}px` } as React.CSSProperties
                      }
                      className="flex items-start gap-3 max-w-70 md:ml-(--curve)"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 mt-2" />
                      <span className="font-satoshi text-neutral-200 text-sm md:text-base leading-relaxed">
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="font-satoshi font-medium bg-brand-primary text-white text-sm md:text-base w-full max-w-md px-6 py-3.5 rounded-sm hover:bg-brand-primary-hover transition-colors cursor-pointer mt-12 md:mt-16"
              >
                Book My Demonstration
              </button>
              <p className="font-satoshi text-neutral-500 text-xs md:text-sm mt-4">
                Hourly slots · Stand 868 · AGE 2026, ICC Sydney
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <AgeMarquee direction="right" />
    </section>
  );
}
