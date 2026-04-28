'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface RevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  rotation?: number;
  duration?: number;
  delay?: number;
  ease?: string;
}

export function useGSAPReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      x = 0,
      scale = 1,
      rotation = 0,
      duration = 1,
      delay = 0,
      ease = 'power3.out',
    } = options;

    gsap.set(el, {
      opacity: 0,
      y,
      x,
      scale: scale === 1 ? 1 : 0.9,
      rotation,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            duration,
            delay,
            ease,
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options]);

  return ref;
}

export function useGSAPStagger<T extends HTMLElement>(
  childSelector: string,
  options: RevealOptions & { stagger?: number } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;

    const {
      y = 30,
      duration = 0.8,
      delay = 0,
      stagger = 0.1,
      ease = 'power3.out',
    } = options;

    gsap.set(children, { opacity: 0, y });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease,
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [childSelector, options]);

  return ref;
}

/* ═══════════════════════════════════════════════════════════
   Magnetic hover effect — elements subtly follow cursor
   ═══════════════════════════════════════════════════════════ */

export function useMagneticHover<T extends HTMLElement>(strength: number = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return ref;
}
