/**
 * ARE-HTML Monaco language registration.
 *
 * Usage:
 *
 *     import * as monaco from 'monaco-editor';
 *     import cfg from './arehtml.monaco.json';
 *     import { registerAreHtml } from './arehtml.monaco';
 *
 *     registerAreHtml(monaco, cfg);
 *     monaco.editor.create(el, { value, language: 'arehtml', theme: 'arehtml-dark' });
 *
 * The JSON config stores regex patterns as strings; this loader converts them
 * to RegExp objects where Monaco requires it. No other transformations are
 * performed, so the JSON remains the single source of truth.
 */

export interface AreHtmlMonacoConfig {
    languageId: string;
    displayName: string;
    fileExtensions: string[];
    aliases: string[];
    mimeTypes: string[];
    configuration: any;
    monarch: any;
    themeRules: { rules: any[] };
    completions?: {
        directives?: { label: string; insertText: string; documentation?: string }[];
        events?:     { label: string; insertText: string; documentation?: string }[];
        bindings?:   { label: string; insertText: string; documentation?: string }[];
        interpolation?: { label: string; insertText: string; documentation?: string }[];
    };
}

/**
 * Convert any string regex literals in the Monarch tokenizer rules to actual
 * RegExp instances. Monaco's Monarch accepts both, but RegExp gives slightly
 * better error messages and parity with the in-source documentation.
 */
function normalizeMonarch(monarch: any): any {
    const out: any = { ...monarch, tokenizer: {} };

    for (const stateName of Object.keys(monarch.tokenizer)) {
        const state = monarch.tokenizer[stateName];
        out.tokenizer[stateName] = state.map((rule: any) => {
            if (Array.isArray(rule) && typeof rule[0] === 'string') {
                try {
                    return [new RegExp(rule[0]), rule[1]];
                } catch {
                    return rule;
                }
            }
            return rule;
        });
    }
    return out;
}

export function registerAreHtml(monaco: any, cfg: AreHtmlMonacoConfig) {
    monaco.languages.register({
        id:         cfg.languageId,
        extensions: cfg.fileExtensions,
        aliases:    cfg.aliases,
        mimetypes:  cfg.mimeTypes,
    });

    monaco.languages.setLanguageConfiguration(cfg.languageId, cfg.configuration);
    monaco.languages.setMonarchTokensProvider(cfg.languageId, normalizeMonarch(cfg.monarch));

    monaco.editor.defineTheme('arehtml-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: cfg.themeRules.rules,
        colors: {},
    });

    monaco.editor.defineTheme('arehtml-light', {
        base: 'vs',
        inherit: true,
        rules: cfg.themeRules.rules,
        colors: {},
    });

    if (cfg.completions) {
        monaco.languages.registerCompletionItemProvider(cfg.languageId, {
            triggerCharacters: ['$', '@', ':', '{'],
            provideCompletionItems(model: any, position: any) {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber:   position.lineNumber,
                    startColumn:     word.startColumn,
                    endColumn:       word.endColumn,
                };

                const kind = monaco.languages.CompletionItemKind;
                const insertRule = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
                const c = cfg.completions!;

                const suggestions = [
                    ...(c.directives || []).map(s => ({
                        ...s, kind: kind.Keyword, insertTextRules: insertRule, range,
                    })),
                    ...(c.events || []).map(s => ({
                        ...s, kind: kind.Event, insertTextRules: insertRule, range,
                    })),
                    ...(c.bindings || []).map(s => ({
                        ...s, kind: kind.Property, insertTextRules: insertRule, range,
                    })),
                    ...(c.interpolation || []).map(s => ({
                        ...s, kind: kind.Snippet, insertTextRules: insertRule, range,
                    })),
                ];

                return { suggestions };
            }
        });
    }
}
