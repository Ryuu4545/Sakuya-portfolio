import { NextRequest, NextResponse } from 'next/server';
import { getContent, updateSection, SiteContent } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { section, data } = await request.json();
    const validSections: (keyof SiteContent)[] = ['hero', 'about', 'skills', 'projects', 'contact', 'footer'];
    if (!validSections.includes(section)) return NextResponse.json({ error: `Invalid section: ${section}` }, { status: 400 });
    const updated = await updateSection(section, data);
    return NextResponse.json({ success: true, content: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
