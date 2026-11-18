import { describe, expect, it } from 'vitest';
import { nowItems, nowMeta } from '../src/data/nowData';

describe('Dados da página /now (nowData.ts)', () => {
  it('deve conter metadados e introdução bilíngues', () => {
    expect(nowMeta.updatedAt.trim().length).toBeGreaterThan(0);
    expect(nowMeta.intro.pt.trim().length).toBeGreaterThan(0);
    expect(nowMeta.intro.en.trim().length).toBeGreaterThan(0);
  });

  it('cada item deve possuir tag, título e descrição em pt e en', () => {
    expect(nowItems.length).toBeGreaterThan(0);
    const ids = new Set<string>();
    for (const item of nowItems) {
      expect(item.id.trim().length).toBeGreaterThan(0);
      expect(ids.has(item.id)).toBe(false);
      ids.add(item.id);

      expect(item.tag.pt.trim().length).toBeGreaterThan(0);
      expect(item.tag.en.trim().length).toBeGreaterThan(0);
      expect(item.title.pt.trim().length).toBeGreaterThan(0);
      expect(item.title.en.trim().length).toBeGreaterThan(0);
      expect(item.description.pt.trim().length).toBeGreaterThan(0);
      expect(item.description.en.trim().length).toBeGreaterThan(0);
    }
  });
});
