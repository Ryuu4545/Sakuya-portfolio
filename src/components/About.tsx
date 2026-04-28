'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '@/lib/useContent';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const content = useContent();
  const about = content?.about;

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

  const stats = [
    { value: about?.yearsExp || '5+', label: 'Years Experience' },
    { value: about?.projectsShipped || '30+', label: 'Projects Shipped' },
    { value: about?.wuwaHours || '∞', label: 'Hours in WuWa' },
    { value: about?.favResonator || '1', label: 'Favourite Resonator' },
  ];

  const quickInfo = [
    ['Location', about?.location || 'Ulaanbaatar, Mongolia 🇲🇳'],
    ['Focus', about?.focus || 'Game Dev, Full-Stack'],
    ['WuWa Main', about?.wuwaMain || 'Phrolova'],
    ['Languages', about?.languages || 'TypeScript, Rust, C#, Python'],
    ['Passion', about?.passion || 'Where code meets art meets music'],
  ];

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-32 lg:py-40">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] opacity-10" style={{ background: 'radial-gradient(circle, rgba(201,20,64,0.3), transparent 70%)' }} />
      <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mx-auto max-w-6xl px-6">
        <motion.div variants={itemVariants} className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-crimson">// About Me</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-silver-light sm:text-5xl lg:text-6xl">
            The Developer Behind<br /><span className="text-glow-crimson text-crimson">the Resonance</span>
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="font-body text-xl leading-relaxed text-silver/90">{about?.bio || 'Loading...'}</p>
            <p className="font-body text-lg leading-relaxed text-silver-dark">{about?.bio2 || ''}</p>
            <p className="font-body text-lg leading-relaxed text-silver-dark">{about?.bio3 || ''}</p>
            <div className="mt-8 border-l-2 border-crimson/40 pl-6">
              <p className="font-body text-lg italic text-silver-dark/70">&ldquo;{about?.quote || 'In the silence between frequencies, creation happens.'}&rdquo;</p>
              <span className="mt-2 block font-heading text-sm uppercase tracking-[0.2em] text-crimson/60">— {about?.quoteAuthor || 'Sakuya'}</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={itemVariants} whileHover={{ scale: 1.02 }} className="glass group rounded-lg p-6 transition-all hover:border-crimson/20">
                  <div className="font-display text-3xl font-bold text-crimson group-hover:text-crimson-light transition-colors sm:text-4xl">{stat.value}</div>
                  <div className="mt-2 font-heading text-xs uppercase tracking-[0.2em] text-silver-dark">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="glass-crimson rounded-lg p-6">
              <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.3em] text-crimson-light">Quick Intel</h3>
              <div className="space-y-3">
                {quickInfo.map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-silver/5 pb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-silver-dark/60">{key}</span>
                    <span className="font-body text-sm text-silver">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
