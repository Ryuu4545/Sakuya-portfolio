'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '@/lib/useContent';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const content = useContent();
  const contact = content?.contact;
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('sent');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Илгээхэд алдаа гарлаа');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Сервертэй холбогдож чадсангүй');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[600px] w-[600px] opacity-5" style={{ background: 'radial-gradient(circle, rgba(201,20,64,0.3), transparent 60%)' }} />

      <div className="mx-auto max-w-4xl px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-orchid">// Get in Touch</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-silver-light sm:text-5xl lg:text-6xl">
            {(contact?.heading || 'Open a Frequency').split(' ').slice(0, -1).join(' ')}<br />
            <span className="text-glow-orchid text-orchid">{(contact?.heading || 'Open a Frequency').split(' ').pop()}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-body text-lg text-silver-dark/70">{contact?.description || 'Send a signal.'}</p>
        </motion.div>

        <motion.form initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} onSubmit={handleSubmit} className="glass rounded-xl p-8 sm:p-12">
          {/* Success message */}
          {status === 'sent' && (
            <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              ✓ Мессеж амжилттай илгээгдлээ! Баярлалаа.
            </div>
          )}

          {/* Error message */}
          {status === 'error' && (
            <div className="mb-6 rounded-lg border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson-light">
              ✕ {errorMsg}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-silver-dark/50">Name</label>
              <input type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="Your name"
                className="w-full rounded-sm border border-silver/10 bg-phantom/50 px-4 py-3 font-body text-sm text-silver-light placeholder:text-silver-dark/30 outline-none transition-all focus:border-crimson/40 focus:shadow-[0_0_20px_rgba(201,20,64,0.1)]" />
            </div>
            <div>
              <label className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-silver-dark/50">Email</label>
              <input type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="your@email.com"
                className="w-full rounded-sm border border-silver/10 bg-phantom/50 px-4 py-3 font-body text-sm text-silver-light placeholder:text-silver-dark/30 outline-none transition-all focus:border-crimson/40 focus:shadow-[0_0_20px_rgba(201,20,64,0.1)]" />
            </div>
          </div>
          <div className="mt-6">
            <label className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-silver-dark/50">Message</label>
            <textarea required rows={6} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} placeholder="Tell me about your project..."
              className="w-full resize-none rounded-sm border border-silver/10 bg-phantom/50 px-4 py-3 font-body text-sm text-silver-light placeholder:text-silver-dark/30 outline-none transition-all focus:border-crimson/40 focus:shadow-[0_0_20px_rgba(201,20,64,0.1)]" />
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {[8, 14, 6, 18, 10, 12, 8].map((h, i) => (
                <div key={i} className="w-[2px] rounded-full bg-crimson/30 frequency-bar" style={{ height: h, animationDelay: `${i * 0.12}s`, animationDuration: `${1 + Math.random()}s` }} />
              ))}
            </div>
            <button type="submit" disabled={status === 'sending'}
              className="group relative overflow-hidden rounded-sm bg-crimson px-10 py-3.5 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-crimson-light hover:shadow-lg hover:shadow-crimson/30 disabled:opacity-50">
              <span className="relative z-10">
                {status === 'sending' ? '⏳ Илгээж байна...' : status === 'sent' ? '✓ Илгээгдлээ' : 'Transmit'}
              </span>
              <div className="absolute inset-0 shimmer" />
            </button>
          </div>
        </motion.form>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }} className="mt-12 text-center">
          <p className="font-body text-sm text-silver-dark/40">
            Or reach me directly at{' '}
            <a href={`mailto:${contact?.email || 'abrenzevseg@gmail.com'}`} className="text-crimson/60 underline decoration-crimson/20 underline-offset-4 transition-colors hover:text-crimson">
              {contact?.email || 'abrenzevseg@gmail.com'}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
