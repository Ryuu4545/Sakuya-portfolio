'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '@/lib/useContent';

function FlowerParticles({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animId: number;
    const particles: any[] = [];
    const resize = () => { const r = container.getBoundingClientRect(); canvas.width = r.width; canvas.height = r.height; };
    resize(); window.addEventListener('resize', resize);
    const colors = ['#c91440', '#7b2d8e', '#e8264f', '#c44dff', '#b8b8c8'];
    const create = () => {
      const cx = canvas.width / 2, cy = canvas.height / 2, a = Math.random() * Math.PI * 2, r = 60 + Math.random() * 120;
      return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, vx: (Math.random() - 0.5) * 0.3, vy: -0.2 - Math.random() * 0.5, size: Math.random() * 2.5 + 0.5, opacity: 0, color: colors[Math.floor(Math.random() * colors.length)], life: 0, maxLife: 100 + Math.random() * 150 };
    };
    for (let i = 0; i < 40; i++) { const p = create(); p.life = Math.random() * p.maxLife; particles.push(p); }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (particles.length < 60 && Math.random() > 0.92) particles.push(create());
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]; p.life++; p.x += p.vx + Math.sin(p.life * 0.02) * 0.3; p.y += p.vy;
        const lr = p.life / p.maxLife; p.opacity = lr < 0.2 ? lr * 5 : lr > 0.8 ? (1 - lr) * 5 : 1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.globalAlpha = p.opacity * 0.6; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3); g.addColorStop(0, p.color); g.addColorStop(1, 'transparent');
        ctx.fillStyle = g; ctx.globalAlpha = p.opacity * 0.15; ctx.fill();
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
      ctx.globalAlpha = 1; animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [containerRef]);
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />;
}

function FrequencyWave() {
  return (
    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" width="400" height="400" viewBox="0 0 400 400">
      {[80, 110, 140, 170].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={i % 2 === 0 ? '#c91440' : '#7b2d8e'} strokeWidth="0.5" strokeDasharray="4 8" opacity={0.3 - i * 0.05}>
          <animateTransform attributeName="transform" type="rotate" from={`0 200 200`} to={`${i % 2 === 0 ? 360 : -360} 200 200`} dur={`${20 + i * 5}s`} repeatCount="indefinite" />
          <animate attributeName="r" values={`${r};${r + 5};${r}`} dur={`${3 + i}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });
  const content = useContent();
  const footer = content?.footer;
  const contact = content?.contact;
  const hero = content?.hero;
  const name = `${hero?.firstLetter || 'S'}${hero?.restOfName || 'akuya'}`;

  const socials = [
    { name: 'GitHub', href: contact?.github || '#', icon: 'GH' },
    { name: 'Twitter', href: contact?.twitter || '#', icon: 'TW' },
    { name: 'Discord', href: contact?.discord || '#', icon: 'DC' },
    { name: 'LinkedIn', href: contact?.linkedin || '#', icon: 'LI' },
  ];

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-silver/5 bg-abyss/80 backdrop-blur-sm">
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center">
          <h3 className="font-display text-5xl font-bold text-silver-light/10 sm:text-7xl lg:text-8xl">Let&apos;s Create</h3>
        </motion.div>
        <div ref={flowerRef} className="relative mx-auto mt-[-40px] h-[350px] w-[350px] sm:h-[400px] sm:w-[400px]">
          <FrequencyWave />
          <FlowerParticles containerRef={flowerRef} />
          <motion.div initial={{ opacity: 0, scale: 0.5, rotate: -30 }} animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} className="absolute inset-0 flex items-center justify-center">
            <motion.div animate={{ rotate: [0, 3, -3, 2, -2, 0], scale: [1, 1.03, 0.98, 1.02, 1], y: [0, -8, 0, -4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="relative">
              <div className="absolute inset-0 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(201,20,64,0.25), rgba(123,45,142,0.15) 40%, transparent 70%)', transform: 'scale(1.5)' }} />
              <img src="/assets/phrolova-flower.png" alt="Flower" className="relative z-10 h-48 w-48 object-contain drop-shadow-[0_0_30px_rgba(201,20,64,0.4)] sm:h-56 sm:w-56" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
                <div className="relative h-32 w-32">
                  {[0, 60, 120, 180, 240, 300].map((d) => (<div key={d} className="absolute left-1/2 top-1/2 h-16 w-8 -translate-x-1/2 origin-bottom rounded-full" style={{ transform: `translate(-50%, -100%) rotate(${d}deg)`, background: 'linear-gradient(to top, rgba(201,20,64,0.6), rgba(123,45,142,0.3))', filter: 'blur(1px)' }} />))}
                  <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson shadow-[0_0_20px_rgba(201,20,64,0.5)]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-silver/5">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-end gap-[2px]">{[8, 14, 6, 12, 8].map((h, i) => (<div key={i} className="w-[2px] rounded-full bg-crimson/50" style={{ height: h }} />))}</div>
              <span className="font-display text-lg font-bold tracking-widest text-silver-light/80">{name.toUpperCase()}</span>
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-silver-dark/40">{footer?.tagline || 'Game Developer & Resonator.'}<br />{footer?.location || 'Ulaanbaatar, Mongolia.'}</p>
          </div>
          <div>
            <h4 className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-silver-dark/30">Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((l) => (<li key={l}><a href={`#${l.toLowerCase()}`} className="font-body text-sm text-silver-dark/50 transition-colors hover:text-crimson-light">{l}</a></li>))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-silver-dark/30">Connect</h4>
            <div className="flex gap-3">
              {socials.map((s) => (<a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" title={s.name} className="flex h-9 w-9 items-center justify-center rounded-sm border border-silver/10 font-mono text-[10px] font-bold text-silver-dark/50 transition-all duration-300 hover:border-crimson/30 hover:bg-crimson/5 hover:text-crimson-light">{s.icon}</a>))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-silver-dark/30">Status</h4>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${hero?.availableForWork ? 'bg-green-500 animate-pulse' : 'bg-silver-dark/30'}`} />
              <span className="font-mono text-xs text-silver-dark/40">{hero?.availableForWork ? 'Available for projects' : 'Currently busy'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-silver/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver-dark/25">© {new Date().getFullYear()} {name}. {footer?.copyright || 'All rights resonated.'}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver-dark/25">Built with Next.js • Three.js • Havoc Energy</p>
        </div>
      </div>
    </footer>
  );
}
