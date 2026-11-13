import { describe, expect, it } from 'vitest';
import { content, skillsList, socialLinks } from '../src/data/translations';

describe('Dicionário de Traduções (translations.ts)', () => {
  it('deve conter as seções principais em pt e en', () => {
    expect(content.pt).toBeDefined();
    expect(content.en).toBeDefined();

    const sections = ['hero', 'about', 'projects', 'footer'] as const;
    for (const section of sections) {
      expect(content.pt[section]).toBeDefined();
      expect(content.en[section]).toBeDefined();
    }
  });

  it('deve ter paridade de campos na seção hero', () => {
    expect(content.pt.hero.role.trim().length).toBeGreaterThan(0);
    expect(content.en.hero.role.trim().length).toBeGreaterThan(0);
    expect(content.pt.hero.bio.trim().length).toBeGreaterThan(0);
    expect(content.en.hero.bio.trim().length).toBeGreaterThan(0);
  });

  it('deve ter paridade na contagem de itens da seção about', () => {
    expect(content.pt.about.items.length).toBeGreaterThan(0);
    expect(content.pt.about.items.length).toBe(content.en.about.items.length);

    for (let i = 0; i < content.pt.about.items.length; i++) {
      expect(content.pt.about.items[i].trim().length).toBeGreaterThan(0);
      expect(content.en.about.items[i].trim().length).toBeGreaterThan(0);
    }
  });

  it('deve possuir lista de tecnologias preenchida e sem duplicatas', () => {
    expect(skillsList.length).toBeGreaterThan(0);
    const uniqueSkills = new Set(skillsList.map((s) => s.toLowerCase()));
    expect(uniqueSkills.size).toBe(skillsList.length);
  });

  it('deve possuir links sociais válidos', () => {
    expect(socialLinks.length).toBeGreaterThan(0);
    for (const link of socialLinks) {
      expect(link.label.trim().length).toBeGreaterThan(0);
      expect(link.url.startsWith('https://') || link.url.startsWith('mailto:')).toBe(true);
    }
  });
});
