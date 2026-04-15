import { AreHTMLTokenizer } from '@adaas/are-html/tokenizer';
import { AreStaticAttribute } from '@adaas/are-html/attributes/AreStatic.attribute';
import { AreBindingAttribute } from '@adaas/are-html/attributes/AreBinding.attribute';
import { AreEventAttribute } from '@adaas/are-html/attributes/AreEvent.attribute';
import { AreDirectiveAttribute } from '@adaas/are-html/attributes/AreDirective.attribute';
import { AreHTMLEngine } from '@adaas/are-html/engine';
import { AreSyntaxTokenMatch } from '@adaas/are';

jest.retryTimes(0);


// ─────────────────────────────────────────────────────────────────────────────
// ── Helpers ───────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a bare AreHTMLTokenizer instance without registering it in any scope,
 * sufficient for testing pure attribute-extraction logic.
 */
function makeTokenizer(): AreHTMLTokenizer {
    // Object.create skips the constructor, so instance properties aren't set.
    // Manually initialise ATTR_PATTERN (the only property extractAttributes needs).
    const t = Object.create(AreHTMLTokenizer.prototype) as AreHTMLTokenizer;
    t.ATTR_PATTERN = /([$:@]?[\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>/"'=]+)))?/g;
    return t;
}

/**
 * Returns an AreHTMLEngine instance so we can call its protected matchers
 * directly without spinning up a full container.
 */
function makeEngine(): AreHTMLEngine {
    return Object.create(AreHTMLEngine.prototype) as AreHTMLEngine;
}

/** Minimal stub for the `build` callback required by the matcher methods. */
function buildStub(
    raw: string,
    content: string,
    position: number,
    closing: string,
): AreSyntaxTokenMatch {
    return { raw, content, position, closing, opening: '<', payload: {} } as unknown as AreSyntaxTokenMatch;
}


// ─────────────────────────────────────────────────────────────────────────────
// ── AreHTMLTokenizer — extractAttributes ─────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

describe('AreHTMLTokenizer — extractAttributes', () => {

    it('parses plain static attributes', () => {
        const tokenizer = makeTokenizer();
        const attrs = tokenizer.extractAttributes('<div class="dashboard" id="main">');

        expect(attrs).toHaveLength(2);
        expect(attrs[0]).toBeInstanceOf(AreStaticAttribute);
        expect(attrs[0].name).toBe('class');
        expect(attrs[0].content).toBe('dashboard');
        expect(attrs[1]).toBeInstanceOf(AreStaticAttribute);
        expect(attrs[1].name).toBe('id');
        expect(attrs[1].content).toBe('main');
    });

    it('parses a binding attribute prefixed with ":"', () => {
        const tokenizer = makeTokenizer();
        const attrs = tokenizer.extractAttributes('<span :class="dynamicClass">');

        expect(attrs).toHaveLength(1);
        expect(attrs[0]).toBeInstanceOf(AreBindingAttribute);
        expect(attrs[0].name).toBe('class');
        expect(attrs[0].content).toBe('dynamicClass');
    });

    it('parses an event attribute prefixed with "@"', () => {
        const tokenizer = makeTokenizer();
        const attrs = tokenizer.extractAttributes('<button @click="onSubmit">');

        expect(attrs).toHaveLength(1);
        expect(attrs[0]).toBeInstanceOf(AreEventAttribute);
        expect(attrs[0].name).toBe('click');
        expect(attrs[0].content).toBe('onSubmit');
    });

    it('parses a directive attribute prefixed with "$"', () => {
        const tokenizer = makeTokenizer();
        const attrs = tokenizer.extractAttributes('<div $if="isVisible">');

        expect(attrs).toHaveLength(1);
        expect(attrs[0]).toBeInstanceOf(AreDirectiveAttribute);
        expect(attrs[0].name).toBe('if');
        expect(attrs[0].content).toBe('isVisible');
    });

    it('parses a "$for" directive from a dashboard-style template', () => {
        const tokenizer = makeTokenizer();
        const attrs = tokenizer.extractAttributes('<tr $for="item in items">');

        expect(attrs).toHaveLength(1);
        expect(attrs[0]).toBeInstanceOf(AreDirectiveAttribute);
        expect(attrs[0].name).toBe('for');
        expect(attrs[0].content).toBe('item in items');
    });

    it('handles mixed attribute types on the same element', () => {
        const tokenizer = makeTokenizer();
        // Resembles a real dashboard nav-item: static class, binding, event, directive
        const attrs = tokenizer.extractAttributes(
            '<span class="nav-item" :class="activeClass" @click="navigate" $if="isVisible">'
        );

        expect(attrs).toHaveLength(4);
        expect(attrs[0]).toBeInstanceOf(AreStaticAttribute);
        expect(attrs[1]).toBeInstanceOf(AreBindingAttribute);
        expect(attrs[2]).toBeInstanceOf(AreEventAttribute);
        expect(attrs[3]).toBeInstanceOf(AreDirectiveAttribute);
    });

    it('returns an empty array for a tag with no attributes', () => {
        const tokenizer = makeTokenizer();
        const attrs = tokenizer.extractAttributes('<div>');

        expect(attrs).toHaveLength(0);
    });

    it('returns an empty array for a self-closing tag with no attributes', () => {
        const tokenizer = makeTokenizer();
        const attrs = tokenizer.extractAttributes('<br/>');

        expect(attrs).toHaveLength(0);
    });

    it('handles attribute values with single quotes', () => {
        const tokenizer = makeTokenizer();
        const attrs = tokenizer.extractAttributes(`<div class='stat-card'>`);

        expect(attrs).toHaveLength(1);
        expect(attrs[0]).toBeInstanceOf(AreStaticAttribute);
        expect(attrs[0].content).toBe('stat-card');
    });
});


// ─────────────────────────────────────────────────────────────────────────────
// ── AreHTMLEngine — htmlElementMatcher ───────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

describe('AreHTMLEngine — htmlElementMatcher', () => {

    it('matches a simple element and returns correct raw/content', () => {
        const engine = makeEngine();
        const source = '<div class="dashboard"></div>';
        const match = (engine as any).htmlElementMatcher(source, 0, source.length, buildStub);

        expect(match).not.toBeNull();
        expect(match!.raw).toBe('<div class="dashboard"></div>');
        expect(match!.content).toBe('');
        expect(match!.payload.entity).toBe('div');
        expect(match!.payload.selfClose).toBe(false);
    });

    it('matches nested elements and captures inner content', () => {
        const engine = makeEngine();
        const source = '<header class="header"><dashboard-logo></dashboard-logo></header>';
        const match = (engine as any).htmlElementMatcher(source, 0, source.length, buildStub);

        expect(match).not.toBeNull();
        expect(match!.payload.entity).toBe('header');
        expect(match!.content).toBe('<dashboard-logo></dashboard-logo>');
    });

    it('matches a self-closing element', () => {
        const engine = makeEngine();
        const source = '<br/>';
        const match = (engine as any).htmlElementMatcher(source, 0, source.length, buildStub);

        expect(match).not.toBeNull();
        expect(match!.payload.entity).toBe('br');
        expect(match!.payload.selfClose).toBe(true);
    });

    it('skips HTML comments and still finds the next element', () => {
        const engine = makeEngine();
        const source = '<!-- header comment --><div></div>';
        const match = (engine as any).htmlElementMatcher(source, 0, source.length, buildStub);

        expect(match).not.toBeNull();
        expect(match!.payload.entity).toBe('div');
    });

    it('matches deeply nested same-tag elements (nesting counter)', () => {
        const engine = makeEngine();
        const source = '<div><div>inner</div></div>';
        const match = (engine as any).htmlElementMatcher(source, 0, source.length, buildStub);

        expect(match).not.toBeNull();
        expect(match!.raw).toBe('<div><div>inner</div></div>');
        expect(match!.content).toBe('<div>inner</div>');
    });

    it('matches a custom component tag (e.g. dashboard-header)', () => {
        const engine = makeEngine();
        const source = '<dashboard-header></dashboard-header>';
        const match = (engine as any).htmlElementMatcher(source, 0, source.length, buildStub);

        expect(match).not.toBeNull();
        expect(match!.payload.entity).toBe('dashboard-header');
    });

    it('extracts the id attribute into the payload', () => {
        const engine = makeEngine();
        const source = '<section id="stats-section"></section>';
        const match = (engine as any).htmlElementMatcher(source, 0, source.length, buildStub);

        expect(match).not.toBeNull();
        expect(match!.payload.id).toBe('stats-section');
    });

    it('returns null for an empty string', () => {
        const engine = makeEngine();
        const match = (engine as any).htmlElementMatcher('', 0, 0, buildStub);

        expect(match).toBeNull();
    });

    it('returns null when the source contains only a closing tag', () => {
        const engine = makeEngine();
        const source = '</div>';
        const match = (engine as any).htmlElementMatcher(source, 0, source.length, buildStub);

        expect(match).toBeNull();
    });
});


// ─────────────────────────────────────────────────────────────────────────────
// ── AreHTMLEngine — rootElementMatcher ───────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

describe('AreHTMLEngine — rootElementMatcher', () => {

    it('matches an <are-root> tag', () => {
        const engine = makeEngine();
        const source = '<are-root><div class="app"></div></are-root>';
        const match = (engine as any).rootElementMatcher(source, 0, source.length, buildStub);

        expect(match).not.toBeNull();
        expect(match!.payload.entity).toBe('are-root');
        expect(match!.content).toBe('<div class="app"></div>');
    });

    it('does not match a non-root tag', () => {
        const engine = makeEngine();
        const source = '<div class="dashboard"></div>';
        const match = (engine as any).rootElementMatcher(source, 0, source.length, buildStub);

        expect(match).toBeNull();
    });
});