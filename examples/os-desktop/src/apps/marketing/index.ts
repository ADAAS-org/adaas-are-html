/**
 * Marketing app bundle entry.
 *
 * This is the ESM module that the OS lazily `import()`s when the user installs
 * or opens the Marketing app. It exports the app's ENTIRE component set — the
 * AppComponentResolver picks each class out of this module by the `export` name
 * declared in the app descriptor (see MarketingApp.backend.ts).
 *
 * One bundle, one backend, three components.
 */
export { MarketingApp } from "./MarketingApp.component";
export { PostEditor } from "./PostEditor.component";
export { PostPreview } from "./PostPreview.component";

import { MarketingApp } from "./MarketingApp.component";
export default MarketingApp;
