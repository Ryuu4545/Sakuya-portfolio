'use client';

import { useState, useEffect, createContext, useContext } from 'react';

interface SiteContent {
  hero: any;
  about: any;
  skills: any[];
  projects: any[];
  contact: any;
  footer: any;
}

const ContentContext = createContext<SiteContent | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => setContent(data))
      .catch(() => console.error('Content load failed'));
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
