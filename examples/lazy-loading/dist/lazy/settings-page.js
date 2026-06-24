import {
  Are,
  Yt,
  __decorateClass,
  __decorateParam,
  __name,
  te
} from "../chunks/chunk-6K72IBO4.js";

// examples/lazy-loading/src/lazy/SettingsPage.component.ts
var _SettingsPage = class _SettingsPage extends Are {
  template(node) {
    node.setContent(`
            <section class="page">
                <span class="eyebrow">Lazy \xB7 fetched on demand</span>
                <h1 class="page-title">Settings</h1>
                <p class="page-lead">A second independently-served bundle. It shares the framework runtime with the app via code-split chunks.</p>
                <div class="settings">
                    <label class="row"><span>Dark theme</span><input type="checkbox" checked /></label>
                    <label class="row"><span>Compact density</span><input type="checkbox" /></label>
                    <label class="row"><span>Telemetry</span><input type="checkbox" /></label>
                    <label class="row"><span>Auto-update components</span><input type="checkbox" checked /></label>
                </div>
            </section>
        `);
  }
  styles(node) {
    node.setStyles(`
            .page { padding: 48px 56px; max-width: 640px; }
            .eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 999px; margin-bottom: 20px; color: #fcd34d; background: rgba(252, 211, 77, 0.12); }
            .page-title { font-size: 32px; font-weight: 800; color: #f4f4f5; margin-bottom: 14px; letter-spacing: -0.02em; }
            .page-lead { font-size: 16px; color: #a1a1aa; line-height: 1.7; margin-bottom: 28px; }
            .settings { display: flex; flex-direction: column; gap: 2px; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; }
            .row { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #1c1c1f; font-size: 14px; color: #e4e4e7; }
            .row + .row { border-top: 1px solid #27272a; }
            .row input { width: 18px; height: 18px; accent-color: #a78bfa; }
        `);
  }
};
__name(_SettingsPage, "SettingsPage");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], _SettingsPage.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], _SettingsPage.prototype, "styles", 1);
var SettingsPage = _SettingsPage;
var SettingsPage_component_default = SettingsPage;
export {
  SettingsPage,
  SettingsPage_component_default as default
};
