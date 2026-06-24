import {
  Are,
  Yt,
  __decorateClass,
  __decorateParam,
  __name,
  te
} from "../chunks/chunk-6K72IBO4.js";

// examples/lazy-loading/src/lazy/ReportsPage.component.ts
var _ReportsPage = class _ReportsPage extends Are {
  template(node) {
    node.setContent(`
            <section class="page">
                <span class="eyebrow">Lazy \xB7 fetched on demand</span>
                <h1 class="page-title">Reports</h1>
                <p class="page-lead">Heavy, rarely-visited views are ideal lazy-load candidates \u2014 they stay out of the critical path.</p>
                <div class="stats">
                    <div class="stat"><div class="stat-value">1,284</div><div class="stat-label">Components served</div></div>
                    <div class="stat"><div class="stat-value">96 ms</div><div class="stat-label">Avg load time</div></div>
                    <div class="stat"><div class="stat-value">3</div><div class="stat-label">Lazy bundles</div></div>
                    <div class="stat"><div class="stat-value">100%</div><div class="stat-label">Cache hit on revisit</div></div>
                </div>
                <div class="bars">
                    <div class="bar" style="height: 38%"></div>
                    <div class="bar" style="height: 62%"></div>
                    <div class="bar" style="height: 48%"></div>
                    <div class="bar" style="height: 81%"></div>
                    <div class="bar" style="height: 55%"></div>
                    <div class="bar" style="height: 72%"></div>
                    <div class="bar" style="height: 90%"></div>
                </div>
            </section>
        `);
  }
  styles(node) {
    node.setStyles(`
            .page { padding: 48px 56px; max-width: 860px; }
            .eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 999px; margin-bottom: 20px; color: #fcd34d; background: rgba(252, 211, 77, 0.12); }
            .page-title { font-size: 32px; font-weight: 800; color: #f4f4f5; margin-bottom: 14px; letter-spacing: -0.02em; }
            .page-lead { font-size: 16px; color: #a1a1aa; line-height: 1.7; margin-bottom: 28px; }
            .stats { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; margin-bottom: 32px; }
            .stat { background: #1c1c1f; border: 1px solid #27272a; border-radius: 12px; padding: 20px; }
            .stat-value { font-size: 26px; font-weight: 800; color: #a78bfa; }
            .stat-label { font-size: 12px; color: #71717a; margin-top: 6px; }
            .bars { display: flex; align-items: flex-end; gap: 12px; height: 180px; padding: 20px; background: #1c1c1f; border: 1px solid #27272a; border-radius: 12px; }
            .bar { flex: 1; background: linear-gradient(180deg, #a78bfa, #7c3aed); border-radius: 6px 6px 0 0; }
        `);
  }
};
__name(_ReportsPage, "ReportsPage");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], _ReportsPage.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], _ReportsPage.prototype, "styles", 1);
var ReportsPage = _ReportsPage;
var ReportsPage_component_default = ReportsPage;
export {
  ReportsPage,
  ReportsPage_component_default as default
};
