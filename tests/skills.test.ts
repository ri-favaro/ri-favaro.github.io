import { describe, expect, it } from 'vitest';
import {
  authorAttribution,
  dailyPractices,
  graphEdges,
  graphNodes,
  skillsListRaw,
  workflowsList,
} from '../src/data/skillsData';

describe('Skills Explorer Data (skillsData.ts)', () => {
  it('deve conter a atribuição indispensável à autora original Lauren Tan (@poteto)', () => {
    expect(authorAttribution.name).toBe('Lauren Tan');
    expect(authorAttribution.handle).toBe('@poteto');
    expect(authorAttribution.github).toBe('https://github.com/poteto');
    expect(authorAttribution.repo).toContain('cursor/plugins');
  });

  it('deve conter exatamente 58 itens cadastrados no total', () => {
    expect(skillsListRaw.length).toBe(58);
  });

  it('deve conter 34 skills operacionais e 24 princípios de engenharia', () => {
    const skills = skillsListRaw.filter((s) => s.kind === 'skill');
    const principles = skillsListRaw.filter((s) => s.kind === 'principle');

    expect(skills.length).toBe(34);
    expect(principles.length).toBe(24);
  });

  it('cada item deve possuir ID único e formato válido', () => {
    const ids = skillsListRaw.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    for (const item of skillsListRaw) {
      expect(item.id.trim().length).toBeGreaterThan(0);
      expect(item.command.startsWith('/') || item.command.startsWith('Aplique')).toBe(true);
      expect(item.summary.pt.trim().length).toBeGreaterThan(10);
      expect(item.summary.en.trim().length).toBeGreaterThan(10);
      expect(item.example.trim().length).toBeGreaterThan(5);
    }
  });

  it('deve conter os 5 pilares do pipeline diário com agentes', () => {
    expect(dailyPractices.length).toBe(5);
    for (const practice of dailyPractices) {
      expect(practice.step.trim().length).toBe(2);
      expect(practice.title.pt.trim().length).toBeGreaterThan(0);
      expect(practice.title.en.trim().length).toBeGreaterThan(0);
      expect(practice.skills.length).toBeGreaterThan(0);
      expect(practice.summary.pt.trim().length).toBeGreaterThan(0);
      expect(practice.summary.en.trim().length).toBeGreaterThan(0);
    }
  });

  it('deve conter 6 workflows com passos válidos', () => {
    expect(workflowsList.length).toBe(6);
    const allSkillIds = new Set(skillsListRaw.map((s) => s.id));

    for (const wf of workflowsList) {
      expect(wf.steps.length).toBeGreaterThan(2);
      for (const step of wf.steps) {
        expect(allSkillIds.has(step.skillId)).toBe(true);
        expect(step.role.pt.trim().length).toBeGreaterThan(0);
        expect(step.role.en.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('as arestas do grafo devem apontar para nós válidos', () => {
    const nodeIds = new Set(graphNodes.map((n) => n.id));
    for (const edge of graphEdges) {
      expect(nodeIds.has(edge.from)).toBe(true);
      expect(nodeIds.has(edge.to)).toBe(true);
      expect(edge.label.trim().length).toBeGreaterThan(0);
    }
  });
});
