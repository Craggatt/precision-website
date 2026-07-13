'use client';

import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useDemoStore } from '@/store/demoStore';

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

function AgeLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1148 668"
      className={className}
      fill="currentColor"
      aria-label="AGE"
    >
      <g transform="matrix(1.121094,0,0,1.121094,0,0)">
        <path d="M497.588,90.865C525.153,84.347 540.304,84.291 558.501,85.48C635.822,90.533 683.544,145.498 683.415,147.491C683.273,149.694 623.916,203.373 619.601,208.585C616.329,212.537 615.378,209.288 614.011,207.985C556.407,153.079 475.506,187.864 449.724,230.644C407.321,301.002 449.95,364.707 485.742,385.071C564.926,430.124 615.317,363.612 622.035,340.405C622.687,338.151 620.7,338.857 572.499,338.766C528.526,338.683 526.806,339.4 526.718,336.49C526.621,333.315 526.71,244.976 526.73,243.506C526.761,241.127 528.04,241.301 550.501,241.329C703.505,241.52 720.116,240.904 721.149,241.863C721.504,242.192 722.722,288.517 720.978,329.517C719.292,369.175 694.382,417.316 668.087,441.062C566.447,532.849 452.165,491.386 399.509,439.491C283.07,324.737 332.836,133.722 497.588,90.865Z" />
        <path d="M289.511,348.494C303.771,378.156 333.677,437.345 333.576,438.515C333.44,440.098 332.414,439.515 278.5,439.642C181.084,439.87 179.474,437.825 177.717,441.6C153.795,492.979 155.376,496.001 149.509,496.02C140.712,496.049 40.653,496.372 39.545,495.438C37.492,493.705 63.68,440.396 78.622,406.556C103.77,349.604 202.154,137.11 212.983,113.72C213.99,111.545 223.731,90.506 225.42,86.466C226.379,84.174 227.268,84.777 257.501,84.703C258.524,84.701 337.289,84.675 337.466,84.696C341.726,85.22 337.095,87.362 317.426,134.468C313.654,143.501 290.814,191.967 275.167,227.348C261.089,259.181 230.104,327.647 226.162,336.358C224.653,339.692 222.887,341.584 226.499,341.526C231.269,341.448 284.037,340.588 286.134,341.992C286.508,342.243 286.433,342.314 289.511,348.494Z" />
        <path d="M734.482,177.5C734.298,85.781 734.264,85.1 735.564,84.676C737.199,84.144 920.425,84.518 936.5,84.551C973.681,84.627 974.938,84.172 975.158,86.541C975.184,86.82 975.161,142.625 975.159,147.502C975.146,178.867 975.383,179.851 973.456,180.107C973.143,180.148 766.142,180.203 756.499,180.181C736.676,180.138 735.107,181.119 734.482,177.5Z" />
        <path d="M734.472,493.501C734.385,486.168 733.409,403.38 734.862,401.828C735.838,400.785 973.541,401 974.355,401.686C975.119,402.33 975.123,408.87 975.124,409.498C975.129,416.847 975.145,494.38 975.125,494.45C974.593,496.31 973.788,496.014 945.498,495.921C773.434,495.35 773.456,496.144 758.498,495.914C737.369,495.59 735.44,497.694 734.472,493.501Z" />
        <path d="M870.499,338.05C852.476,338.009 852.55,338.258 834.499,338.025C798.537,337.561 766.423,338.01 760.503,338.093C756.815,338.145 757.744,336.017 757.685,304.5C757.57,242.009 758.023,241.906 758.511,241.517C758.994,241.132 759.083,241.314 796.5,241.2C799.693,241.19 972.705,241.095 973.547,241.273C975.357,241.655 975.133,242.547 975.182,291.502C975.186,295.097 975.227,336.033 975.112,336.443C974.458,338.774 972.474,337.956 924.501,338.047C897.496,338.098 897.571,337.829 870.499,338.05Z" />
      </g>
    </svg>
  );
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
