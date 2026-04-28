import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

/*
  CONTENT MANAGER
  - Vercel дээр: Vercel KV (Redis) ашиглана
  - Localhost дээр: content.json файл ашиглана (KV_REST_API_URL байхгүй бол)
*/

export interface SiteContent {
  hero: any;
  about: any;
  skills: any[];
  projects: any[];
  contact: any;
  footer: any;
}

const CONTENT_KEY = 'site_content';
const isVercel = !!process.env.KV_REST_API_URL;

// Fallback: content.json файлаас унших (localhost)
function getFileContent(): SiteContent {
  const filePath = path.join(process.cwd(), 'content.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function saveFileContent(content: SiteContent): void {
  const filePath = path.join(process.cwd(), 'content.json');
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
}

// GET content
export async function getContent(): Promise<SiteContent> {
  if (isVercel) {
    const data = await kv.get<SiteContent>(CONTENT_KEY);
    if (data) return data;
    // KV хоосон бол content.json-оос seed хийх
    const fileContent = getFileContent();
    await kv.set(CONTENT_KEY, fileContent);
    return fileContent;
  }
  return getFileContent();
}

// SAVE content
export async function saveContent(content: SiteContent): Promise<void> {
  if (isVercel) {
    await kv.set(CONTENT_KEY, content);
  } else {
    saveFileContent(content);
  }
}

// UPDATE a section
export async function updateSection<K extends keyof SiteContent>(
  section: K,
  data: SiteContent[K]
): Promise<SiteContent> {
  const content = await getContent();
  content[section] = data;
  await saveContent(content);
  return content;
}
