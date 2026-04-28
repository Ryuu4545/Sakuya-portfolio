'use client';

import { ContentProvider } from '@/lib/useContent';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import SectionDivider from '@/components/SectionDivider';

export default function Home() {
  return (
    <ContentProvider>
      <main className="relative min-h-screen">
        <CursorGlow />
        <Navbar />
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Contact />
        <Footer />
      </main>
    </ContentProvider>
  );
}
