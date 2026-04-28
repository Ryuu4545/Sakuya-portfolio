'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '@/lib/useContent';

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }} className="group">
      <a href={project.link} className="block">
        <div className="glass hover-lift relative overflow-hidden rounded-lg transition-all duration-500 hover:border-crimson/20">
          <div className="relative h-56 overflow-hidden sm:h-64">
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}22, #0d0a17, ${project.color}11)` }} />
            <img src={project.image} alt={project.title} className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-90 group-hover:scale-105"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/50 to-transparent" />
            <div className="absolute left-4 top-4">
              <span className="rounded-sm px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}30` }}>{project.category}</span>
            </div>
            <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-silver/10 bg-void/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-silver-light"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-heading text-xl font-bold text-silver-light transition-colors group-hover:text-crimson-light">{project.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-silver-dark/70">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (<span key={tag} className="rounded-sm bg-phantom/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-silver-dark/50">{tag}</span>))}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const content = useContent();
  const projects = (content?.projects || []).filter((p: any) => p.visible !== false);

  return (
    <section id="projects" className="relative py-32 lg:py-40">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] opacity-5" style={{ background: 'radial-gradient(circle, rgba(123,45,142,0.4), transparent 70%)' }} />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div ref={headerRef} initial={{ opacity: 0, y: 40 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-orchid">// Selected Work</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-silver-light sm:text-5xl lg:text-6xl">Crafted with<br /><span className="text-glow-orchid text-orchid">Precision</span></h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project: any, i: number) => (<ProjectCard key={project.id || i} project={project} index={i} />))}
        </div>
      </div>
    </section>
  );
}
