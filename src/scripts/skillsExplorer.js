function initSkillsExplorer() {
  const data = window.__SKILLS_DATA__;
  if (!data) return;

  const { SKILLS, WORKFLOWS, GRAPH_NODES, GRAPH_EDGES, CAT_COLORS } = data;
  const skillById = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

  let activeTab = 'all';
  let searchQuery = '';
  let skillCatFilter = 'Todas';
  let principleCatFilter = 'Todas';
  let graphClusterFilter = 'Todos';
  let selectedGraphNode = 'poteto-mode';

  function getCurrentLang() {
    return document.documentElement.getAttribute('lang') || 'pt';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setActiveTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    document.querySelectorAll('.view-panel').forEach((panel) => {
      const show = tab === 'all' || panel.dataset.view === tab;
      panel.classList.toggle('hidden', !show);
    });
  }

  function matchesSearch(skill) {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const lang = getCurrentLang();
    const sum = skill.summary[lang] || skill.summary.pt;
    const relText = Object.values(skill.relations || {})
      .flat()
      .join(' ');
    const hay =
      `${skill.id} ${skill.command} ${skill.category} ${sum} ${skill.example} ${relText}`.toLowerCase();
    return hay.includes(q);
  }

  function buildCardHtml(s) {
    const c = CAT_COLORS[s.category] || CAT_COLORS.Core;
    const rel = s.relations || {};
    const relRows = [];
    const lang = getCurrentLang();
    const summaryText = s.summary[lang] || s.summary.pt;

    const makeLinks = (arr) =>
      arr
        .map(
          (id) =>
            `<a class="rel-link" href="#skill-${id}" data-jump="${id}">/${escapeHtml(id)}</a>`,
        )
        .join('');

    if (rel.uses && rel.uses.length) {
      const lbl = lang === 'en' ? 'Uses / Calls:' : 'Usa / Chama:';
      relRows.push(
        `<div class="rel-row"><span class="rel-lbl">${lbl}</span>${makeLinks(rel.uses)}</div>`,
      );
    }
    if (rel.usedBy && rel.usedBy.length) {
      const lbl = lang === 'en' ? 'Used by:' : 'Usada por:';
      relRows.push(
        `<div class="rel-row"><span class="rel-lbl">${lbl}</span>${makeLinks(rel.usedBy)}</div>`,
      );
    }
    if (rel.pairsWith && rel.pairsWith.length) {
      const lbl = lang === 'en' ? 'Pairs with:' : 'Combina com:';
      relRows.push(
        `<div class="rel-row"><span class="rel-lbl">${lbl}</span>${makeLinks(rel.pairsWith)}</div>`,
      );
    }

    const manualBadgeText = lang === 'en' ? 'manual invocation' : 'invocação manual';
    const exampleLabelText = lang === 'en' ? 'Usage Example' : 'Exemplo de Uso';
    const copyText = lang === 'en' ? 'Copy' : 'Copiar';

    return `
      <article class="skill-card" id="skill-${s.id}">
        <div class="card-top">
          <div class="card-title-wrap">
            <h4 class="card-title">${escapeHtml(s.id)}</h4>
            <span class="card-cmd">${escapeHtml(s.command)}</span>
          </div>
          <div class="badges">
            <span class="cat-badge" style="background:${c.bg};color:${c.text};border-color:${c.border}">${escapeHtml(s.category)}</span>
            ${s.manualOnly ? `<span class="manual-badge" title="disable-model-invocation: true">${manualBadgeText}</span>` : ''}
          </div>
        </div>
        <p class="card-summary">${escapeHtml(summaryText)}</p>
        <div class="example-box">
          <div class="example-label">
            <span>${exampleLabelText}</span>
            <button class="copy-btn" data-copy="${escapeHtml(s.example)}">${copyText}</button>
          </div>
          <pre class="example-code">${escapeHtml(s.example)}</pre>
        </div>
        ${relRows.length ? `<div class="relations-block">${relRows.join('')}</div>` : ''}
      </article>
    `;
  }

  function renderCards() {
    const lang = getCurrentLang();
    const skillsFiltered = SKILLS.filter(
      (s) =>
        s.kind === 'skill' &&
        (skillCatFilter === 'Todas' || s.category === skillCatFilter) &&
        matchesSearch(s),
    );
    const principlesFiltered = SKILLS.filter(
      (s) =>
        s.kind === 'principle' &&
        (principleCatFilter === 'Todas' || s.category === principleCatFilter) &&
        matchesSearch(s),
    );

    const skillsCountLabel = document.getElementById('skills-count-label');
    const principlesCountLabel = document.getElementById('principles-count-label');

    if (skillsCountLabel) {
      skillsCountLabel.textContent =
        lang === 'en'
          ? `Showing ${skillsFiltered.length} of 34 skills`
          : `Exibindo ${skillsFiltered.length} de 34 skills`;
    }
    if (principlesCountLabel) {
      principlesCountLabel.innerHTML =
        lang === 'en'
          ? `Showing ${principlesFiltered.length} of 24 principles (<code>principle-*</code>)`
          : `Exibindo ${principlesFiltered.length} de 24 princípios (<code>principle-*</code>)`;
    }

    const skillsGrid = document.getElementById('skills-grid');
    const principlesGrid = document.getElementById('principles-grid');

    const emptyText =
      lang === 'en'
        ? 'No skills or principles found matching your search.'
        : 'Nenhuma skill ou princípio encontrado para este filtro ou busca.';

    if (skillsGrid) {
      skillsGrid.innerHTML = skillsFiltered.length
        ? skillsFiltered.map(buildCardHtml).join('')
        : `<div class="empty-state">${emptyText}</div>`;
    }

    if (principlesGrid) {
      principlesGrid.innerHTML = principlesFiltered.length
        ? principlesFiltered.map(buildCardHtml).join('')
        : `<div class="empty-state">${emptyText}</div>`;
    }
  }

  function renderWorkflows() {
    const grid = document.getElementById('workflows-grid');
    if (!grid) return;
    const lang = getCurrentLang();

    grid.innerHTML = WORKFLOWS.map((wf) => {
      const title = wf.title[lang] || wf.title.pt;
      const tag = wf.tag[lang] || wf.tag.pt;
      const desc = wf.desc[lang] || wf.desc.pt;

      const stepsHtml = wf.steps
        .map((step, idx) => {
          const role = step.role[lang] || step.role.pt;
          return `
            <a class="wf-step" href="#skill-${step.skillId}" data-jump="${step.skillId}">
              <span class="wf-step-name">/${escapeHtml(step.skillId)}</span>
              <span class="wf-step-role">${escapeHtml(role)}</span>
            </a>
            ${idx < wf.steps.length - 1 ? '<span class="wf-arrow">&rarr;</span>' : ''}
          `;
        })
        .join('');

      return `
        <div class="wf-card">
          <div class="wf-head">
            <h4>${escapeHtml(title)}</h4>
            <span class="wf-tag">${escapeHtml(tag)}</span>
          </div>
          <p class="wf-desc">${escapeHtml(desc)}</p>
          <div class="wf-steps">${stepsHtml}</div>
        </div>
      `;
    }).join('');
  }

  function renderFilters() {
    const skillCats = [
      'Todas',
      ...new Set(SKILLS.filter((s) => s.kind === 'skill').map((s) => s.category)),
    ];
    const skillsFiltersEl = document.getElementById('skills-filters');
    if (skillsFiltersEl) {
      skillsFiltersEl.innerHTML = skillCats
        .map((cat) => {
          const dotColor = CAT_COLORS[cat]?.dot || 'var(--accent)';
          return `
            <button class="chip-btn ${skillCatFilter === cat ? 'active' : ''}" data-cat-skill="${cat}">
              <span class="chip-dot" style="background-color: ${cat === 'Todas' ? 'var(--accent)' : dotColor}"></span>
              <span>${cat}</span>
            </button>
          `;
        })
        .join('');
    }

    const pCats = [
      'Todas',
      ...new Set(SKILLS.filter((s) => s.kind === 'principle').map((s) => s.category)),
    ];
    const pFiltersEl = document.getElementById('principles-filters');
    if (pFiltersEl) {
      pFiltersEl.innerHTML = pCats
        .map((cat) => {
          const dotColor = CAT_COLORS[cat]?.dot || 'var(--accent)';
          return `
            <button class="chip-btn ${principleCatFilter === cat ? 'active' : ''}" data-cat-principle="${cat}">
              <span class="chip-dot" style="background-color: ${cat === 'Todas' ? 'var(--accent)' : dotColor}"></span>
              <span>${cat}</span>
            </button>
          `;
        })
        .join('');
    }

    const gCats = ['Todos', ...new Set(GRAPH_NODES.map((n) => n.cluster))];
    const gFiltersEl = document.getElementById('graph-filters');
    if (gFiltersEl) {
      gFiltersEl.innerHTML = gCats
        .map((c) => {
          const dotColor = CAT_COLORS[c]?.dot || 'var(--accent)';
          return `
            <button class="chip-btn ${graphClusterFilter === c ? 'active' : ''}" data-cluster="${c}">
              <span class="chip-dot" style="background-color: ${c === 'Todos' ? 'var(--accent)' : dotColor}"></span>
              <span>${c}</span>
            </button>
          `;
        })
        .join('');
    }
  }

  function updateInspector(id) {
    const box = document.getElementById('graph-inspector');
    if (!box) return;
    const s = skillById[id];
    if (!s) return;

    const lang = getCurrentLang();
    const summary = s.summary[lang] || s.summary.pt;
    const outgoing = GRAPH_EDGES.filter((e) => e.from === id).map((e) => ({
      id: e.to,
      lbl: e.label,
    }));
    const incoming = GRAPH_EDGES.filter((e) => e.to === id).map((e) => ({
      id: e.from,
      lbl: e.label,
    }));

    const outTitle = lang === 'en' ? 'CALLS / ORCHESTRATES' : 'CHAMA / DIRECIONA PARA';
    const inTitle = lang === 'en' ? 'CALLED BY' : 'CHAMADA POR';
    const jumpBtnText = lang === 'en' ? 'View Full Card & Example →' : 'Ver card e exemplo completo →';

    box.innerHTML = `
      <div>
        <h4 style="margin:0;font-family:ui-monospace,monospace;font-size:1.1rem;color:var(--accent);">/${escapeHtml(s.id)}</h4>
        <span class="cat-badge" style="display:inline-block;margin-top:6px;background:${CAT_COLORS[s.category].bg};color:${CAT_COLORS[s.category].text};border-color:${CAT_COLORS[s.category].border}">${escapeHtml(s.category)}</span>
      </div>
      <p style="margin:0;font-size:0.86rem;color:var(--text-muted);line-height:1.5;">${escapeHtml(summary)}</p>
      ${
        outgoing.length
          ? `
        <div>
          <div style="font-size:0.72rem;color:var(--text-muted);font-weight:600;margin-bottom:5px;letter-spacing:0.04em;">${outTitle}</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${outgoing
              .map(
                (o) =>
                  `<button class="rel-link" data-node-select="${o.id}">/${o.id} (${o.lbl})</button>`,
              )
              .join('')}
          </div>
        </div>`
          : ''
      }
      ${
        incoming.length
          ? `
        <div>
          <div style="font-size:0.72rem;color:var(--text-muted);font-weight:600;margin-bottom:5px;letter-spacing:0.04em;">${inTitle}</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${incoming
              .map(
                (i) =>
                  `<button class="rel-link" data-node-select="${i.id}">/${i.id}</button>`,
              )
              .join('')}
          </div>
        </div>`
          : ''
      }
      <button class="btn-primary" style="margin-top:auto;width:100%;justify-content:center;" data-jump="${s.id}">
        ${jumpBtnText}
      </button>
    `;
  }

  function renderGraph() {
    const svg = document.getElementById('skill-graph');
    if (!svg) return;

    const nodeMap = Object.fromEntries(GRAPH_NODES.map((n) => [n.id, n]));
    const activeId = selectedGraphNode;
    const connectedIds = new Set([activeId]);

    GRAPH_EDGES.forEach((e) => {
      if (e.from === activeId) connectedIds.add(e.to);
      if (e.to === activeId) connectedIds.add(e.from);
    });

    const edgesHtml = GRAPH_EDGES.map((e) => {
      const n1 = nodeMap[e.from];
      const n2 = nodeMap[e.to];
      if (!n1 || !n2) return '';
      const isAdj = e.from === activeId || e.to === activeId;
      const clusterMatch =
        graphClusterFilter === 'Todos' ||
        n1.cluster === graphClusterFilter ||
        n2.cluster === graphClusterFilter;
      const cls = !clusterMatch
        ? 'graph-edge dim'
        : isAdj
          ? 'graph-edge active'
          : 'graph-edge';
      return `<line class="${cls}" x1="${n1.x}" y1="${n1.y}" x2="${n2.x}" y2="${n2.y}" />`;
    }).join('');

    const nodesHtml = GRAPH_NODES.map((n) => {
      const c = CAT_COLORS[n.cluster] || CAT_COLORS.Core;
      const clusterMatch =
        graphClusterFilter === 'Todos' || n.cluster === graphClusterFilter;
      const isSel = n.id === activeId;
      const isConn = connectedIds.has(n.id);
      const dim = !clusterMatch || (activeId && !isConn);
      return `
        <g class="graph-node ${isSel ? 'selected' : ''} ${dim ? 'dim' : ''}"
           data-node-id="${n.id}">
          <circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${c.dot}" />
          <text x="${n.x}" y="${n.y + n.r + 13}">${escapeHtml(n.label)}</text>
        </g>
      `;
    }).join('');

    svg.innerHTML = edgesHtml + nodesHtml;
    updateInspector(activeId);
  }

  function jumpToSkill(id) {
    const s = skillById[id];
    if (!s) return;

    if (activeTab !== 'all') {
      setActiveTab(s.kind === 'skill' ? 'skills' : 'principles');
    }
    if (s.kind === 'skill' && skillCatFilter !== 'Todas' && skillCatFilter !== s.category) {
      skillCatFilter = 'Todas';
      renderFilters();
    }
    if (
      s.kind === 'principle' &&
      principleCatFilter !== 'Todas' &&
      principleCatFilter !== s.category
    ) {
      principleCatFilter = 'Todas';
      renderFilters();
    }
    if (searchQuery) {
      searchQuery = '';
      const searchInput = document.getElementById('search-input');
      const searchClear = document.getElementById('search-clear');
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.classList.remove('visible');
    }
    renderCards();

    requestAnimationFrame(() => {
      const el = document.getElementById(`skill-${id}`);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('highlight');
      setTimeout(() => el.classList.remove('highlight'), 2000);
    });
  }

  // Delegated event handling
  document.addEventListener('click', (e) => {
    // Jump to skill
    const jumpBtn = e.target.closest('[data-jump]');
    if (jumpBtn) {
      e.preventDefault();
      jumpToSkill(jumpBtn.dataset.jump);
      return;
    }

    // Node select in graph or inspector
    const nodeEl = e.target.closest('[data-node-id]');
    if (nodeEl) {
      selectedGraphNode = nodeEl.dataset.nodeId;
      renderGraph();
      return;
    }

    const nodeSelectBtn = e.target.closest('[data-node-select]');
    if (nodeSelectBtn) {
      selectedGraphNode = nodeSelectBtn.dataset.nodeSelect;
      renderGraph();
      return;
    }

    // Tab buttons
    const tabBtn = e.target.closest('.tab-btn');
    if (tabBtn && tabBtn.dataset.tab) {
      setActiveTab(tabBtn.dataset.tab);
      return;
    }

    // Filter chips
    const skillChip = e.target.closest('[data-cat-skill]');
    if (skillChip) {
      skillCatFilter = skillChip.dataset.catSkill;
      renderFilters();
      renderCards();
      return;
    }

    const principleChip = e.target.closest('[data-cat-principle]');
    if (principleChip) {
      principleCatFilter = principleChip.dataset.catPrinciple;
      renderFilters();
      renderCards();
      return;
    }

    const clusterChip = e.target.closest('[data-cluster]');
    if (clusterChip) {
      graphClusterFilter = clusterChip.dataset.cluster;
      renderFilters();
      renderGraph();
      return;
    }

    // Copy button
    const copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) {
      const textToCopy = copyBtn.dataset.copy;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const orig = copyBtn.textContent;
        const lang = getCurrentLang();
        copyBtn.textContent = lang === 'en' ? 'Copied!' : 'Copiado!';
        copyBtn.style.borderColor = 'var(--accent)';
        setTimeout(() => {
          copyBtn.textContent = orig;
          copyBtn.style.borderColor = '';
        }, 1400);
      });
      return;
    }
  });

  // Search input handling
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim();
      if (searchClear) searchClear.classList.toggle('visible', searchQuery.length > 0);
      renderCards();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchQuery = '';
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchClear.classList.remove('visible');
      renderCards();
    });
  }

  // Keyboard shortcut '/' to search
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput?.focus();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur();
    }
  });

  // Observe language change to re-render texts
  const langObserver = new MutationObserver(() => {
    renderCards();
    renderWorkflows();
    updateInspector(selectedGraphNode);
  });
  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  // Initial mount
  renderFilters();
  renderWorkflows();
  renderGraph();
  renderCards();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkillsExplorer);
} else {
  initSkillsExplorer();
}
