'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useContent } from '@/lib/useContent';

const PhrolovaCard = dynamic(() => import('./PhrolovaCard'), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const content = useContent();
  const hero = content?.hero;

  return (
    <section id="home" ref={containerRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/assets/phrolova-bg.jpg" alt="" className="h-full w-full object-cover" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/50 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-void/40" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(123,45,142,0.2), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(201,20,64,0.15), transparent 50%)' }} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[1] flex items-end justify-center gap-[3px] pb-20 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-[2px] rounded-full bg-crimson frequency-bar"
            style={{ height: Math.random() * 40 + 4, animationDelay: `${Math.random() * 2}s`, animationDuration: `${0.8 + Math.random() * 1.5}s`, opacity: 0.3 + Math.random() * 0.7 }} />
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 lg:flex-row lg:gap-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {hero?.availableForWork && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-crimson animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson-light">Available for Work</span>
            </motion.div>
          )}

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl font-black leading-none tracking-wider text-silver-glow sm:text-7xl lg:text-8xl xl:text-9xl">
            <span className="text-glow-crimson">{hero?.firstLetter || 'S'}</span>{hero?.restOfName || 'akuya'}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-4 font-heading text-xl font-light uppercase tracking-[0.5em] text-silver-dark sm:text-2xl">
            {hero?.subtitle || 'Game Developer & Resonator'}
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="mt-6 max-w-md font-body text-lg leading-relaxed text-silver-dark/80">
            {hero?.description || 'Crafting immersive digital experiences.'}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }} className="mt-10 flex gap-4">
            <a href="#projects" className="group relative overflow-hidden rounded-sm bg-crimson px-8 py-3 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-crimson-light hover:shadow-lg hover:shadow-crimson/30">
              <span className="relative z-10">View Work</span><div className="absolute inset-0 shimmer" />
            </a>
            <a href="#contact" className="rounded-sm border border-silver-dark/30 px-8 py-3 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-silver transition-all duration-300 hover:border-orchid hover:text-orchid-light">Contact</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[400px] w-[300px] sm:h-[500px] sm:w-[360px] lg:h-[550px] lg:w-[400px]">
          <div className="absolute inset-0 animate-glow-pulse rounded-2xl blur-3xl"
            style={{ background: 'radial-gradient(ellipse, rgba(201,20,64,0.25) 0%, rgba(123,45,142,0.15) 50%, transparent 70%)' }} />
          <PhrolovaCard />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-silver-dark/50">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-crimson/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
