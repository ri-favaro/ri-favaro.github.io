import { describe, expect, it } from 'vitest';

const noteModules = import.meta.glob('../src/content/notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Frontmatter inválido ou ausente');
  }
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      data[key] = val;
    }
  }
  return { data, body: match[2].trim() };
}

describe('Notas Técnicas (src/content/notes)', () => {
  it('deve possuir ao menos um par de notas com paridade PT/EN por noteSlug', () => {
    const entries = Object.entries(noteModules);
    expect(entries.length).toBeGreaterThanOrEqual(2);

    const bySlug = new Map<string, Set<string>>();

    for (const [, content] of entries) {
      const { data, body } = parseFrontmatter(content);

      expect(data.noteSlug?.length).toBeGreaterThan(0);
      expect(['pt', 'en']).toContain(data.lang);
      expect(data.title?.length).toBeGreaterThan(0);
      expect(data.summary?.length).toBeGreaterThan(0);
      expect(data.publishedAt?.length).toBeGreaterThan(0);
      expect(data.tags?.length).toBeGreaterThan(2);
      expect(body.length).toBeGreaterThan(50);

      const langs = bySlug.get(data.noteSlug) ?? new Set<string>();
      langs.add(data.lang);
      bySlug.set(data.noteSlug, langs);
    }

    for (const [slug, langs] of bySlug.entries()) {
      expect(langs.has('pt'), `Slug "${slug}" sem versão PT`).toBe(true);
      expect(langs.has('en'), `Slug "${slug}" sem versão EN`).toBe(true);
    }
  });
});
