import { isStaticMarkup, STANDARD_HTML_TAGS } from '../src/engine/AreHTML.constants';

/**
 * Unit coverage for the static-island detector that drives the
 * tokenizer fast-path (skip per-node explosion) and the AddStaticHTML
 * one-shot materialisation. Correctness here is what guarantees we never
 * collapse a subtree that actually needs reactive per-node handling.
 */
describe('isStaticMarkup — static-island detection', () => {

    describe('returns TRUE for fully static content', () => {
        it('plain text', () => {
            expect(isStaticMarkup('Hello World')).toBe(true);
        });

        it('text with HTML entities (the &nbsp; case)', () => {
            expect(isStaticMarkup('Hello&nbsp;World')).toBe(true);
            expect(isStaticMarkup('a &amp; b &#160; c &#x41;')).toBe(true);
        });

        it('a single standard element with static attributes', () => {
            expect(isStaticMarkup('<span class="x">hi</span>')).toBe(true);
        });

        it('nested standard elements', () => {
            expect(isStaticMarkup('<div class="card"><span>Hello&nbsp;World</span></div>')).toBe(true);
        });

        it('static attribute value containing a colon (url / style)', () => {
            expect(isStaticMarkup('<a href="https://example.com">x</a>')).toBe(true);
            expect(isStaticMarkup('<span style="color:red;margin:0">x</span>')).toBe(true);
        });

        it('static attribute value containing @ (email)', () => {
            expect(isStaticMarkup('<span data-mail="a@b.com">x</span>')).toBe(true);
        });

        it('void elements and self-closing tags', () => {
            expect(isStaticMarkup('line<br/>break<hr>')).toBe(true);
            expect(isStaticMarkup('<img src="x.png" alt="pic">')).toBe(true);
        });

        it('table fragments', () => {
            expect(isStaticMarkup('<tr><td>a</td><td>b</td></tr>')).toBe(true);
        });

        it('html comments are inert', () => {
            expect(isStaticMarkup('<span>x</span><!-- a note --><b>y</b>')).toBe(true);
        });

        it('single-quoted static attributes', () => {
            expect(isStaticMarkup("<div class='a b'>x</div>")).toBe(true);
        });
    });

    describe('returns FALSE for dynamic content', () => {
        it('interpolations', () => {
            expect(isStaticMarkup('<span>{{name}}</span>')).toBe(false);
            expect(isStaticMarkup('Hello {{name}}')).toBe(false);
        });

        it('binding attribute (:)', () => {
            expect(isStaticMarkup('<div :class="x">y</div>')).toBe(false);
        });

        it('event attribute (@)', () => {
            expect(isStaticMarkup('<button @click="$do()">y</button>')).toBe(false);
        });

        it('directive attribute ($)', () => {
            expect(isStaticMarkup('<div $if="cond">y</div>')).toBe(false);
            expect(isStaticMarkup('<li $for="x in items">y</li>')).toBe(false);
        });

        it('dynamic attribute nested deep in an otherwise static tree', () => {
            expect(isStaticMarkup('<div class="a"><span><b :title="t">x</b></span></div>')).toBe(false);
        });
    });

    describe('returns FALSE for non-standard tags (components / custom / svg)', () => {
        it('custom component (kebab-case)', () => {
            expect(isStaticMarkup('<dashboard-header></dashboard-header>')).toBe(false);
            expect(isStaticMarkup('<div><the-card>x</the-card></div>')).toBe(false);
        });

        it('are-root outlet', () => {
            expect(isStaticMarkup('<are-root id="x"></are-root>')).toBe(false);
        });

        it('svg elements (need namespace handling)', () => {
            expect(isStaticMarkup('<svg><rect/></svg>')).toBe(false);
            expect(isStaticMarkup('<div><path d="M0 0"/></div>')).toBe(false);
        });
    });

    describe('edge cases', () => {
        it('empty / falsy content is not an island', () => {
            expect(isStaticMarkup('')).toBe(false);
        });

        it('unterminated tag bails to the safe path', () => {
            expect(isStaticMarkup('<div class="x"')).toBe(false);
        });

        it('whitespace-only content is treated as static text', () => {
            expect(isStaticMarkup('   ')).toBe(true);
        });

        it('STANDARD_HTML_TAGS excludes svg/component tags', () => {
            expect(STANDARD_HTML_TAGS.has('div')).toBe(true);
            expect(STANDARD_HTML_TAGS.has('svg')).toBe(false);
            expect(STANDARD_HTML_TAGS.has('rect')).toBe(false);
        });
    });
});
