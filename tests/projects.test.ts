import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/projects';

describe('Lista de Projetos (projects.ts)', () => {
  it('deve conter projetos cadastrados', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('cada projeto deve ter um id único', () => {
    const ids = projects.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('cada projeto deve ter títulos e descrições bilíngues não vazios', () => {
    for (const project of projects) {
      expect(project.id.trim().length).toBeGreaterThan(0);

      expect(project.title.pt.trim().length).toBeGreaterThan(0);
      expect(project.title.en.trim().length).toBeGreaterThan(0);

      expect(project.description.pt.trim().length).toBeGreaterThan(0);
      expect(project.description.en.trim().length).toBeGreaterThan(0);
    }
  });

  it('cada projeto deve possuir ao menos uma tag técnica', () => {
    for (const project of projects) {
      expect(project.tags.length).toBeGreaterThan(0);
      for (const tag of project.tags) {
        expect(tag.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('se houver link externo, deve ser URL válida e conter linkText bilíngue', () => {
    for (const project of projects) {
      if (project.link) {
        expect(
          project.link.startsWith('http://') ||
            project.link.startsWith('https://') ||
            project.link.startsWith('/'),
        ).toBe(true);

        expect(project.linkText).toBeDefined();
        expect(project.linkText?.pt.trim().length).toBeGreaterThan(0);
        expect(project.linkText?.en.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
