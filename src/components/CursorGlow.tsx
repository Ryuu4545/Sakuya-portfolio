'use client';

import { useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════════
   CURSOR GLOW — Follows mouse with a crimson/orchid glow
   Hidden on mobile. Adds atmosphere to desktop experience.
   ═══════════════════════════════════════════════════════════ */

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[9998] hidden lg:block"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        width: 400,
        height: 400,
        background:
          'radial-gradient(circle, rgba(201,20,64,0.07) 0%, rgba(123,45,142,0.04) 40%, transparent 70%)',
        borderRadius: '50%',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    />
  );
}
