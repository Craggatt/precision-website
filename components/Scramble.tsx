"use client";

import React, { useRef, useEffect, useState, useCallback, JSX } from "react";

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export interface ScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  charset?: string;
  duration?: number;
  stagger?: number;
  iterationsPerChar?: number;
  triggerOnce?: boolean;
  triggerOnHover?: boolean;
  respectReducedMotion?: boolean;
  onComplete?: () => void;
}

const Scramble: React.FC<ScrambleProps> = ({
  text,
  className = "",
  style = {},
  tag = "span",
  charset = DEFAULT_CHARSET,
  duration = 600,
  stagger = 40,
  iterationsPerChar = 6,
  triggerOnce = true,
  triggerOnHover = true,
  respectReducedMotion = true,
  onComplete,
}) => {
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);
  const isPlayingRef = useRef(false);

  const rand = useCallback(
    () => charset[Math.floor(Math.random() * charset.length)],
    [charset]
  );

  const play = useCallback(() => {
    if (isPlayingRef.current) return;
    if (
      respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (ref.current) ref.current.textContent = text;
      onComplete?.();
      return;
    }

    isPlayingRef.current = true;
    const chars = text.split("");
    const totalChars = chars.length;
    // Each char reveals after its stagger delay, then cycles iterationsPerChar times
    const frameInterval = Math.max(duration / (totalChars * iterationsPerChar), 16);
    let frame = 0;
    const totalFrames = totalChars * iterationsPerChar;

    const tick = () => {
      if (!ref.current) return;

      const output = chars.map((ch, i) => {
        if (ch === " ") return " ";
        const revealFrame = i * iterationsPerChar;
        if (frame >= revealFrame + iterationsPerChar) return ch;
        if (frame >= revealFrame) return rand();
        return rand();
      });

      ref.current.textContent = output.join("");
      frame++;

      if (frame <= totalFrames) {
        frameRef.current = window.setTimeout(tick, frameInterval);
      } else {
        ref.current.textContent = text;
        isPlayingRef.current = false;
        onComplete?.();
      }
    };

    tick();
  }, [text, charset, duration, stagger, iterationsPerChar, respectReducedMotion, rand, onComplete]);

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (triggerOnce && hasPlayedRef.current) return;
          hasPlayedRef.current = true;
          play();
          if (triggerOnce) observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [play, triggerOnce]);

  // Hover trigger
  useEffect(() => {
    const el = ref.current;
    if (!el || !triggerOnHover) return;

    const handleHover = () => {
      if (!isPlayingRef.current) play();
    };

    el.addEventListener("mouseenter", handleHover);
    return () => el.removeEventListener("mouseenter", handleHover);
  }, [play, triggerOnHover]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current !== null) clearTimeout(frameRef.current);
    };
  }, []);

  const Tag = (tag || "span") as keyof JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    { ref: ref as any, className, style },
    text
  );
};

export default Scramble;
