import { describe, expect, it } from 'vitest';
import { education, experiences, languages, resumeMeta, skillGroups } from '../src/data/resumeData';

describe('Dados do Currículo (resumeData.ts)', () => {
  it('deve conter metadados e resumo bilíngues completos', () => {
    expect(resumeMeta.name.trim().length).toBeGreaterThan(0);
    expect(resumeMeta.role.pt.trim().length).toBeGreaterThan(0);
    expect(resumeMeta.role.en.trim().length).toBeGreaterThan(0);
    expect(resumeMeta.summary.pt.trim().length).toBeGreaterThan(0);
    expect(resumeMeta.summary.en.trim().length).toBeGreaterThan(0);
    expect(resumeMeta.pdfPath.startsWith('/')).toBe(true);
  });

  it('cada experiência deve ter paridade bilíngue nos destaques', () => {
    expect(experiences.length).toBeGreaterThan(0);
    for (const exp of experiences) {
      expect(exp.company.trim().length).toBeGreaterThan(0);
      expect(exp.role.pt.trim().length).toBeGreaterThan(0);
      expect(exp.role.en.trim().length).toBeGreaterThan(0);
      expect(exp.period.pt.trim().length).toBeGreaterThan(0);
      expect(exp.period.en.trim().length).toBeGreaterThan(0);
      expect(exp.highlights.pt.length).toBeGreaterThan(0);
      expect(exp.highlights.pt.length).toBe(exp.highlights.en.length);
      for (let i = 0; i < exp.highlights.pt.length; i++) {
        expect(exp.highlights.pt[i].trim().length).toBeGreaterThan(0);
        expect(exp.highlights.en[i].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('formação acadêmica, grupos de skills e idiomas devem estar completos em pt e en', () => {
    expect(education.length).toBeGreaterThan(0);
    for (const edu of education) {
      expect(edu.degree.pt.trim().length).toBeGreaterThan(0);
      expect(edu.degree.en.trim().length).toBeGreaterThan(0);
      expect(edu.institution.trim().length).toBeGreaterThan(0);
      expect(edu.details.pt.trim().length).toBeGreaterThan(0);
      expect(edu.details.en.trim().length).toBeGreaterThan(0);
    }

    expect(skillGroups.length).toBeGreaterThan(0);
    for (const group of skillGroups) {
      expect(group.category.pt.trim().length).toBeGreaterThan(0);
      expect(group.category.en.trim().length).toBeGreaterThan(0);
      expect(group.items.length).toBeGreaterThan(0);
    }

    expect(languages.length).toBeGreaterThan(0);
    for (const lang of languages) {
      expect(lang.name.pt.trim().length).toBeGreaterThan(0);
      expect(lang.name.en.trim().length).toBeGreaterThan(0);
      expect(lang.level.pt.trim().length).toBeGreaterThan(0);
      expect(lang.level.en.trim().length).toBeGreaterThan(0);
    }
  });
});
