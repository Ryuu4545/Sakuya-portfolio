'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '@/lib/useContent';

function SkillBar({ skill, color, delay, inView }: { skill: any; color: string; delay: number; inView: boolean }) {
  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="font-heading text-sm font-medium text-silver-light">{skill.name}</span>
        </div>
        <span className="font-mono text-xs text-silver-dark/50">Lv.{skill.level}</span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-phantom">
        <motion.div initial={{ width: 0 }} animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 12px ${color}40` }} />
        <div className="absolute inset-0 shimmer opacity-30" />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const content = useContent();
  const categories = content?.skills || [];

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] opacity-8"
        style={{ background: 'radial-gradient(circle, rgba(201,20,64,0.15), transparent 70%)' }} />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-crimson">// Skill Tree</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-silver-light sm:text-5xl lg:text-6xl">
            Resonator<br /><span className="text-glow-crimson text-crimson">Forte</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat: any, catIdx: number) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: catIdx * 0.2 }}
              className="glass rounded-lg p-6 transition-all hover:border-crimson/10">
              <div className="mb-6">
                <h3 className="font-heading text-lg font-bold uppercase tracking-[0.15em]" style={{ color: cat.color }}>{cat.title}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-silver-dark/40">{cat.subtitle}</p>
              </div>
              <div className="space-y-5">
                {(cat.skills || []).map((skill: any, skillIdx: number) => (
                  <SkillBar key={skill.name} skill={skill} color={cat.color} delay={catIdx * 0.2 + skillIdx * 0.1} inView={isInView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
