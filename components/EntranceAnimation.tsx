'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import Image from 'next/image';

gsap.registerPlugin(MorphSVGPlugin);

// Full-screen rectangle in the same 5906×5906 coordinate space as mask.svg
const FULL_RECT = 'M0,0 L5906,0 L5906,5906 L0,5906 Z';

export default function EntranceAnimation({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const holeGroupRef = useRef<SVGGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';

    // Scale starts at 0, centred on the 5906×5906 viewBox
    // Runs synchronously before paint, so users never see the unmasked initial state
    gsap.set(holeGroupRef.current, { svgOrigin: '2953 2953', scale: 0 });

    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        document.body.style.overflow = '';
        setDone(true);
        onComplete?.();
      },
    });

    // Phase 1 — logo holes grow to a small size in the centre
    tl.to(holeGroupRef.current, {
      scale: 0.28,
      duration: 1.1,
      ease: 'back.out(1.4)',
    });

    // Phase 2 — holes morph to fill the screen; simultaneously scale up to 1
    //            so the expansion feels continuous
    tl.to(
      holeGroupRef.current,
      { scale: 1, duration: 1.0, ease: 'power2.inOut' },
      '+=0.35'
    );
    tl.to(
      [path1Ref.current, path2Ref.current],
      {
        morphSVG: FULL_RECT,
        duration: 1.0,
        ease: 'power2.inOut',
      },
      '<' // same time as the scale-up
    );

    // Phase 3 — slide the overlay up, revealing the real page
    tl.to(
      overlayRef.current,
      {
        y: '-100%',
        duration: 0.85,
        ease: 'power2.inOut',
      },
      '+=0.1'
    );

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden' }}
    >
      <Image
        src="https://dlpwfd6kwolf1.cloudfront.net/vlcsnap-2025-11-26-11h59m45s630.webp"
        priority
        alt="" // Fill with descriptive text if possible for SEO/Accessibility
        fill
        style={{ objectFit: 'cover' }}
      />

      {/* White SVG overlay — the logo paths are black "holes" that let the image show through */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 5906 5906"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="entrance-mask">
            {/* white = opaque white fill | black = transparent (shows image behind) */}
            <rect x="0" y="0" width="5906" height="5906" fill="white" />
            <g
              ref={holeGroupRef}
              transform="translate(2953 2953) scale(0) translate(-2953 -2953)"
            >
              {/* Exact paths from mask.svg */}
              <path
                ref={path1Ref}
                fill="black"
                d="M4643.453,4030.316c136.665,-135.62 138.488,-130.098 275.97,-267.645c466.048,-466.267 612.829,-1294.066 625.304,-1438.868c52.449,-608.828 -233.125,-892.481 -116.447,-901.475c129.643,-9.994 848.739,1620.722 -44.949,3063.192c-203.996,329.262 -202.334,330.793 -492.208,590.461c-45.94,41.153 -376.348,337.13 -617.797,461.196c-549.947,282.583 -929.719,303.944 -1014.413,308.707c-1075.29,60.48 -1097.617,-46.713 -1097.917,-135.209c-0.632,-186.475 672.876,-3059.387 685.124,-3097.005c203.548,-625.181 846.064,-410.446 865.569,-257.5c83.742,656.628 -527.174,631.679 -605.78,681.64c-26.709,16.976 -48.297,30.697 -119.607,377.073c-226.133,1098.401 -229.014,1099.236 -224.282,1108.087c51.185,95.733 1324.295,43.027 1881.433,-492.654Z"
              />
              <path
                ref={path2Ref}
                fill="black"
                d="M2555.263,81.018c51.085,-14.35 742.582,-10.608 768.34,-4.582c9.91,2.318 8.197,-3.536 127.178,3.062c83.559,4.633 391.364,91.126 445.445,108.603c655.306,211.769 1111.375,604.347 1124.358,699.814c16.078,118.226 -126.7,-22.726 -134.554,-30.48c-576.883,-569.508 -2081.374,-342.139 -2852.098,337.786c-20.514,18.097 -242.951,214.329 -254.755,228.096c-425.236,495.922 -402.699,512.914 -609.718,1023.639c-104.385,257.523 -484.099,2045.316 -495.301,2114.075c-69.26,425.136 -390.269,-421.798 -430.417,-538.902c-167.08,-487.344 -143.058,-767.193 -143.073,-968.938c-0.018,-239.529 11.11,-469.05 14.171,-477.596c6.942,-19.379 33.629,-340.326 175.302,-664.804c416.367,-953.619 763.118,-1070.066 987.978,-1278.527c316.677,-293.583 1121.5,-507.523 1277.146,-551.246Z"
              />
            </g>
          </mask>
        </defs>

        {/* White rectangle — the mask punches the logo holes through it */}
        <rect
          x="0"
          y="0"
          width="5906"
          height="5906"
          fill="white"
          mask="url(#entrance-mask)"
        />
      </svg>
    </div>
  );
}
