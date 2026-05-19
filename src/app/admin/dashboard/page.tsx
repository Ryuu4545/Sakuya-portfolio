'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Tab = 'hero' | 'about' | 'skills' | 'projects' | 'contact' | 'footer';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'hero', label: 'Нүүр хуудас', icon: '' },
  { key: 'about', label: 'Миний тухай', icon: '' },
  { key: 'skills', label: 'Ур чадвар', icon: '' },
  { key: 'projects', label: 'Төслүүд', icon: '' },
  { key: 'contact', label: 'Холбоо барих', icon: '' },
  { key: 'footer', label: 'Footer', icon: '' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function init() {
      const authRes = await fetch('/api/auth');
      const authData = await authRes.json();
      if (!authData.authenticated) { router.push('/admin/login'); return; }
      const contentRes = await fetch('/api/content');
      const contentData = await contentRes.json();
      setContent(contentData);
      setLoading(false);
    }
    init();
  }, [router]);

  const saveSection = useCallback(async (section: string, data: any) => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data }),
      });
      const result = await res.json();
      if (res.ok) { setContent(result.content); showToast('✓ Амжилттай хадгаллаа!'); }
      else { showToast('Алдаа: ' + result.error); }
    } catch { showToast('Серверт холбогдож чадсангүй'); }
    setSaving(false);
  }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const handleLogout = async () => { await fetch('/api/auth', { method: 'DELETE' }); router.push('/admin/login'); };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void">
        <div className="flex items-center gap-3 text-silver-dark">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-crimson border-t-transparent" />
          <span className="font-heading">Ачааллаж байна...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-void">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-silver/5 bg-abyss transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-silver/5 px-6 py-5">
            <div className="flex items-end gap-[2px]">
              {[8, 14, 6, 12, 8].map((h, i) => (<div key={i} className="w-[2px] rounded-full bg-crimson" style={{ height: h }} />))}
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-widest text-silver-light">ADMIN</div>
              <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-silver-dark/40">Dashboard</div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {TABS.map((tab) => (
              <button key={tab.key} onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-heading text-sm transition-all ${
                  activeTab === tab.key ? 'bg-crimson/10 text-crimson-light border border-crimson/20' : 'text-silver-dark/60 hover:bg-phantom/50 hover:text-silver-light border border-transparent'
                }`}>
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium uppercase tracking-wider">{tab.label}</span>
              </button>
            ))}
          </nav>
          <div className="border-t border-silver/5 p-4 space-y-2">
            <a href="/" target="_blank" className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 font-heading text-sm text-silver-dark/50 hover:bg-phantom/50 hover:text-silver-light">
              <span></span><span className="uppercase tracking-wider">Сайт харах</span>
            </a>
            <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 font-heading text-sm text-crimson/60 hover:bg-crimson/5 hover:text-crimson">
              <span></span><span className="uppercase tracking-wider">Гарах</span>
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-silver/5 bg-void/90 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-lg p-2 text-silver-dark hover:bg-phantom lg:hidden">
              <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>
            </button>
            <h1 className="font-heading text-lg font-semibold uppercase tracking-[0.15em] text-silver-light">
              {TABS.find((t) => t.key === activeTab)?.icon} {TABS.find((t) => t.key === activeTab)?.label}
            </h1>
          </div>
          {saving && <div className="flex items-center gap-2 font-heading text-sm text-silver-dark/50"><div className="h-4 w-4 animate-spin rounded-full border-2 border-crimson border-t-transparent" />Хадгалж байна...</div>}
        </header>

        <div className="mx-auto max-w-4xl p-6 lg:p-8">
          {activeTab === 'hero' && <HeroEditor data={content.hero} onSave={(d: any) => saveSection('hero', d)} saving={saving} />}
          {activeTab === 'about' && <AboutEditor data={content.about} onSave={(d: any) => saveSection('about', d)} saving={saving} />}
          {activeTab === 'skills' && <SkillsEditor data={content.skills} onSave={(d: any) => saveSection('skills', d)} saving={saving} />}
          {activeTab === 'projects' && <ProjectsEditor data={content.projects} onSave={(d: any) => saveSection('projects', d)} saving={saving} />}
          {activeTab === 'contact' && <ContactEditor data={content.contact} onSave={(d: any) => saveSection('contact', d)} saving={saving} />}
          {activeTab === 'footer' && <FooterEditor data={content.footer} onSave={(d: any) => saveSection('footer', d)} saving={saving} />}
        </div>
      </main>

      {toast && <div className="fixed bottom-6 right-6 z-50 animate-fade-up rounded-lg border border-crimson/20 bg-abyss/95 px-5 py-3 font-heading text-sm text-silver-light shadow-xl backdrop-blur-sm">{toast}</div>}
    </div>
  );
}

/* ── Shared UI ── */
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="rounded-xl border border-silver/5 bg-abyss/50 p-6"><h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-silver-dark/40">{title}</h3>{children}</div>);
}

function InputField({ label, value, onChange, placeholder = '', rows, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; type?: string }) {
  const cls = 'w-full rounded-lg border border-silver/10 bg-phantom/40 px-4 py-2.5 font-body text-sm text-silver-light outline-none transition-all placeholder:text-silver-dark/30 focus:border-crimson/40 focus:shadow-[0_0_15px_rgba(201,20,64,0.08)]';
  return (<div><label className="mb-1.5 block font-heading text-xs font-medium uppercase tracking-[0.15em] text-silver-dark/50">{label}</label>
    {rows ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={cls + ' resize-none'} />
      : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />}</div>);
}

function SaveButton({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (<button onClick={onClick} disabled={saving} className="rounded-lg bg-crimson px-8 py-2.5 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-light hover:shadow-lg hover:shadow-crimson/20 disabled:opacity-50">{saving ? 'Хадгалж байна...' : '💾 Хадгалах'}</button>);
}

/* ── Hero Editor ── */
function HeroEditor({ data, onSave, saving }: { data: any; onSave: (d: any) => void; saving: boolean }) {
  const [form, setForm] = useState({ ...data });
  const u = (k: string, v: any) => setForm({ ...form, [k]: v });
  return (<div className="space-y-6">
    <SectionCard title="Үндсэн мэдээлэл"><div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Нэрний эхний үсэг" value={form.firstLetter} onChange={(v) => u('firstLetter', v)} />
        <InputField label="Нэрний үлдсэн хэсэг" value={form.restOfName} onChange={(v) => u('restOfName', v)} />
      </div>
      <InputField label="Дэд гарчиг" value={form.subtitle} onChange={(v) => u('subtitle', v)} />
      <InputField label="Тодорхойлолт" value={form.description} onChange={(v) => u('description', v)} rows={3} />
      <div className="flex items-center gap-3">
        <label className="font-heading text-xs font-medium uppercase tracking-[0.15em] text-silver-dark/50">Ажилд бэлэн</label>
        <button onClick={() => u('availableForWork', !form.availableForWork)} className={`relative h-6 w-11 rounded-full transition-colors ${form.availableForWork ? 'bg-crimson' : 'bg-phantom'}`}>
          <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${form.availableForWork ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
      </div>
    </div></SectionCard>
    <div className="flex justify-end"><SaveButton onClick={() => onSave(form)} saving={saving} /></div>
  </div>);
}

/* ── About Editor (with quoteAuthor) ── */
function AboutEditor({ data, onSave, saving }: { data: any; onSave: (d: any) => void; saving: boolean }) {
  const [form, setForm] = useState({ ...data });
  const u = (k: string, v: any) => setForm({ ...form, [k]: v });
  return (<div className="space-y-6">
    <SectionCard title="Миний тухай текст"><div className="space-y-4">
      <InputField label="Эхний параграф" value={form.bio} onChange={(v) => u('bio', v)} rows={3} />
      <InputField label="Хоёр дахь параграф" value={form.bio2} onChange={(v) => u('bio2', v)} rows={3} />
      <InputField label="Гурав дахь параграф" value={form.bio3} onChange={(v) => u('bio3', v)} rows={3} />
      <InputField label="Ишлэл" value={form.quote} onChange={(v) => u('quote', v)} />
      <InputField label="Ишлэлийн зохиогч" value={form.quoteAuthor || ''} onChange={(v) => u('quoteAuthor', v)} placeholder="Sakuya" />
    </div></SectionCard>
    <SectionCard title="Статистик"><div className="grid gap-4 sm:grid-cols-2">
      <InputField label="Туршлага (жил)" value={form.yearsExp} onChange={(v) => u('yearsExp', v)} />
      <InputField label="Хийсэн төсөл" value={form.projectsShipped} onChange={(v) => u('projectsShipped', v)} />
      <InputField label="WuWa цаг" value={form.wuwaHours} onChange={(v) => u('wuwaHours', v)} />
      <InputField label="Дуртай Resonator" value={form.favResonator} onChange={(v) => u('favResonator', v)} />
    </div></SectionCard>
    <SectionCard title="Хурдан мэдээлэл"><div className="space-y-4">
      <InputField label="Байршил" value={form.location} onChange={(v) => u('location', v)} />
      <InputField label="Чиглэл" value={form.focus} onChange={(v) => u('focus', v)} />
      <InputField label="WuWa Main" value={form.wuwaMain} onChange={(v) => u('wuwaMain', v)} />
      <InputField label="Хэлүүд" value={form.languages} onChange={(v) => u('languages', v)} />
      <InputField label="Сонирхол" value={form.passion} onChange={(v) => u('passion', v)} />
    </div></SectionCard>
    <div className="flex justify-end"><SaveButton onClick={() => onSave(form)} saving={saving} /></div>
  </div>);
}

/* ── Skills Editor ── */
function SkillsEditor({ data, onSave, saving }: { data: any[]; onSave: (d: any) => void; saving: boolean }) {
  const [categories, setCategories] = useState(JSON.parse(JSON.stringify(data || [])));
  const [openCat, setOpenCat] = useState<number | null>(0);

  const updCat = (ci: number, key: string, val: any) => {
    const c = [...categories]; c[ci] = { ...c[ci], [key]: val }; setCategories(c);
  };

  const updSkill = (ci: number, si: number, key: string, val: any) => {
    const c = JSON.parse(JSON.stringify(categories));
    c[ci].skills[si] = { ...c[ci].skills[si], [key]: val };
    setCategories(c);
  };

  const addSkill = (ci: number) => {
    const c = JSON.parse(JSON.stringify(categories));
    c[ci].skills.push({ name: 'Шинэ ур чадвар', level: 50, icon: '⭐' });
    setCategories(c);
  };

  const removeSkill = (ci: number, si: number) => {
    const c = JSON.parse(JSON.stringify(categories));
    c[ci].skills.splice(si, 1);
    setCategories(c);
  };

  const addCategory = () => {
    setCategories([...categories, { title: 'Шинэ ангилал', subtitle: 'Тодорхойлолт', color: '#c91440', skills: [{ name: 'Ур чадвар', level: 50, icon: '⭐' }] }]);
    setOpenCat(categories.length);
  };

  const removeCategory = (ci: number) => {
    setCategories(categories.filter((_: any, i: number) => i !== ci));
    setOpenCat(null);
  };

  return (<div className="space-y-6">
    {categories.map((cat: any, ci: number) => (
      <div key={ci} className="rounded-xl border border-silver/5 bg-abyss/50 overflow-hidden">
        {/* Category header */}
        <div onClick={() => setOpenCat(openCat === ci ? null : ci)}
          className={`flex items-center justify-between p-4 cursor-pointer transition-all ${openCat === ci ? 'bg-crimson/5 border-b border-silver/5' : 'hover:bg-phantom/30'}`}>
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full" style={{ background: cat.color }} />
            <div>
              <div className="font-heading text-sm font-medium text-silver-light">{cat.title}</div>
              <div className="font-heading text-xs text-silver-dark/40">{cat.subtitle} • {cat.skills?.length || 0} ур чадвар</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); removeCategory(ci); }}
              className="rounded p-1 text-silver-dark/30 hover:bg-crimson/10 hover:text-crimson text-xs">✕</button>
            <span className="text-silver-dark/30">{openCat === ci ? '▲' : '▼'}</span>
          </div>
        </div>

        {/* Expanded */}
        {openCat === ci && (
          <div className="p-6 space-y-6">
            {/* Category settings */}
            <div className="grid gap-4 sm:grid-cols-3">
              <InputField label="Ангилалын нэр" value={cat.title} onChange={(v) => updCat(ci, 'title', v)} />
              <InputField label="Дэд гарчиг" value={cat.subtitle} onChange={(v) => updCat(ci, 'subtitle', v)} />
              <div>
                <label className="mb-1.5 block font-heading text-xs font-medium uppercase tracking-[0.15em] text-silver-dark/50">Өнгө</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={cat.color} onChange={(e) => updCat(ci, 'color', e.target.value)} className="h-9 w-14 cursor-pointer rounded border border-silver/10 bg-transparent" />
                  <span className="font-mono text-xs text-silver-dark/40">{cat.color}</span>
                </div>
              </div>
            </div>

            {/* Skills list */}
            <div className="space-y-3">
              <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-silver-dark/40">Ур чадварууд</h4>
              {(cat.skills || []).map((skill: any, si: number) => (
                <div key={si} className="flex items-center gap-3 rounded-lg border border-silver/5 bg-phantom/20 p-3">
                  <input value={skill.icon} onChange={(e) => updSkill(ci, si, 'icon', e.target.value)}
                    className="w-10 bg-transparent text-center text-lg outline-none" />
                  <input value={skill.name} onChange={(e) => updSkill(ci, si, 'name', e.target.value)}
                    className="flex-1 bg-transparent font-heading text-sm text-silver-light outline-none" />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-silver-dark/40">Lv.</span>
                    <input type="number" min="0" max="100" value={skill.level}
                      onChange={(e) => updSkill(ci, si, 'level', parseInt(e.target.value) || 0)}
                      className="w-14 rounded border border-silver/10 bg-phantom/40 px-2 py-1 text-center font-mono text-xs text-silver-light outline-none focus:border-crimson/40" />
                  </div>
                  <button onClick={() => removeSkill(ci, si)} className="rounded p-1 text-silver-dark/30 hover:bg-crimson/10 hover:text-crimson text-xs">✕</button>
                </div>
              ))}
              <button onClick={() => addSkill(ci)}
                className="w-full rounded-lg border border-dashed border-silver/15 px-4 py-2 font-heading text-xs uppercase tracking-[0.15em] text-silver-dark/40 transition-all hover:border-crimson/30 hover:text-crimson">
                + Ур чадвар нэмэх
              </button>
            </div>
          </div>
        )}
      </div>
    ))}

    <div className="flex items-center justify-between">
      <button onClick={addCategory}
        className="rounded-lg border border-dashed border-silver/20 px-6 py-2.5 font-heading text-sm uppercase tracking-[0.15em] text-silver-dark/50 transition-all hover:border-crimson/30 hover:text-crimson">
        + Ангилал нэмэх
      </button>
      <SaveButton onClick={() => onSave(categories)} saving={saving} />
    </div>
  </div>);
}

/* ── Projects Editor ── */
function ProjectsEditor({ data, onSave, saving }: { data: any[]; onSave: (d: any) => void; saving: boolean }) {
  const [projects, setProjects] = useState([...data]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const upd = (idx: number, key: string, val: any) => { const u = [...projects]; u[idx] = { ...u[idx], [key]: val }; setProjects(u); };
  const addProject = () => { setProjects([...projects, { id: Date.now().toString(), title: 'Шинэ төсөл', category: 'Web Development', description: 'Тодорхойлолт...', tags: ['React', 'TypeScript'], image: '/assets/projects/new.jpg', link: '#', color: '#c91440', visible: true }]); setEditIdx(projects.length); };
  const removeProject = (idx: number) => { setProjects(projects.filter((_, i) => i !== idx)); setEditIdx(null); };
  const moveProject = (idx: number, dir: -1 | 1) => { const ni = idx + dir; if (ni < 0 || ni >= projects.length) return; const u = [...projects]; [u[idx], u[ni]] = [u[ni], u[idx]]; setProjects(u); setEditIdx(ni); };

  return (<div className="space-y-6">
    <div className="space-y-3">
      {projects.map((project, idx) => (<div key={project.id || idx}>
        <div onClick={() => setEditIdx(editIdx === idx ? null : idx)}
          className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all ${editIdx === idx ? 'border-crimson/30 bg-crimson/5' : 'border-silver/5 bg-abyss/50 hover:border-silver/10'}`}>
          <div className="flex items-center gap-4">
            <div className="h-3 w-3 rounded-full" style={{ background: project.color, opacity: project.visible ? 1 : 0.3 }} />
            <div><div className="font-heading text-sm font-medium text-silver-light">{project.title}</div>
              <div className="font-heading text-xs text-silver-dark/40">{project.category} {!project.visible && '(нуугдсан)'}</div></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); moveProject(idx, -1); }} className="rounded p-1 text-silver-dark/30 hover:bg-phantom hover:text-silver-light">↑</button>
            <button onClick={(e) => { e.stopPropagation(); moveProject(idx, 1); }} className="rounded p-1 text-silver-dark/30 hover:bg-phantom hover:text-silver-light">↓</button>
            <button onClick={(e) => { e.stopPropagation(); removeProject(idx); }} className="rounded p-1 text-silver-dark/30 hover:bg-crimson/10 hover:text-crimson">✕</button>
          </div>
        </div>
        {editIdx === idx && (<div className="mt-2 rounded-xl border border-silver/5 bg-abyss/30 p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="Нэр" value={project.title} onChange={(v) => upd(idx, 'title', v)} />
            <InputField label="Ангилал" value={project.category} onChange={(v) => upd(idx, 'category', v)} />
          </div>
          <InputField label="Тодорхойлолт" value={project.description} onChange={(v) => upd(idx, 'description', v)} rows={3} />
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="Зургийн зам" value={project.image} onChange={(v) => upd(idx, 'image', v)} />
            <InputField label="Холбоос" value={project.link} onChange={(v) => upd(idx, 'link', v)} />
          </div>
          <InputField label="Тагууд (таслалаар)" value={project.tags.join(', ')} onChange={(v) => upd(idx, 'tags', v.split(',').map((t: string) => t.trim()))} />
          <div className="flex items-center gap-4">
            <div><label className="mb-1.5 block font-heading text-xs font-medium uppercase tracking-[0.15em] text-silver-dark/50">Өнгө</label>
              <div className="flex items-center gap-2"><input type="color" value={project.color} onChange={(e) => upd(idx, 'color', e.target.value)} className="h-9 w-14 cursor-pointer rounded border border-silver/10 bg-transparent" /><span className="font-mono text-xs text-silver-dark/40">{project.color}</span></div></div>
            <div className="flex items-center gap-3"><label className="font-heading text-xs font-medium uppercase tracking-[0.15em] text-silver-dark/50">Харагдах</label>
              <button onClick={() => upd(idx, 'visible', !project.visible)} className={`relative h-6 w-11 rounded-full transition-colors ${project.visible ? 'bg-crimson' : 'bg-phantom'}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${project.visible ? 'translate-x-5' : 'translate-x-0.5'}`} /></button></div>
          </div>
        </div>)}
      </div>))}
    </div>
    <div className="flex items-center justify-between">
      <button onClick={addProject} className="rounded-lg border border-dashed border-silver/20 px-6 py-2.5 font-heading text-sm uppercase tracking-[0.15em] text-silver-dark/50 hover:border-crimson/30 hover:text-crimson">+ Төсөл нэмэх</button>
      <SaveButton onClick={() => onSave(projects)} saving={saving} />
    </div>
  </div>);
}

/* ── Contact Editor ── */
function ContactEditor({ data, onSave, saving }: { data: any; onSave: (d: any) => void; saving: boolean }) {
  const [form, setForm] = useState({ ...data });
  const u = (k: string, v: any) => setForm({ ...form, [k]: v });
  return (<div className="space-y-6">
    <SectionCard title="Холбоо барих текст"><div className="space-y-4">
      <InputField label="Гарчиг" value={form.heading} onChange={(v) => u('heading', v)} />
      <InputField label="Тодорхойлолт" value={form.description} onChange={(v) => u('description', v)} rows={2} />
    </div></SectionCard>
    <SectionCard title="Холбоосууд"><div className="space-y-4">
      <InputField label="Email (мессеж энд ирнэ)" value={form.email} onChange={(v) => u('email', v)} type="email" placeholder="you@gmail.com" />
      <InputField label="GitHub" value={form.github} onChange={(v) => u('github', v)} />
      <InputField label="Twitter / X" value={form.twitter} onChange={(v) => u('twitter', v)} />
      <InputField label="Discord" value={form.discord} onChange={(v) => u('discord', v)} />
      <InputField label="LinkedIn" value={form.linkedin} onChange={(v) => u('linkedin', v)} />
    </div></SectionCard>
    <div className="flex justify-end"><SaveButton onClick={() => onSave(form)} saving={saving} /></div>
  </div>);
}

/* ── Footer Editor ── */
function FooterEditor({ data, onSave, saving }: { data: any; onSave: (d: any) => void; saving: boolean }) {
  const [form, setForm] = useState({ ...data });
  const u = (k: string, v: any) => setForm({ ...form, [k]: v });
  return (<div className="space-y-6">
    <SectionCard title="Footer мэдээлэл"><div className="space-y-4">
      <InputField label="Тайлбар" value={form.tagline} onChange={(v) => u('tagline', v)} />
      <InputField label="Байршил" value={form.location} onChange={(v) => u('location', v)} />
      <InputField label="Зохиогчийн эрх" value={form.copyright} onChange={(v) => u('copyright', v)} />
    </div></SectionCard>
    <div className="flex justify-end"><SaveButton onClick={() => onSave(form)} saving={saving} /></div>
  </div>);
}
