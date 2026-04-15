import { A_Scope } from '@adaas/a-concept';
import { AreEngine, AreSyntax, AreSyntaxTokenMatch } from '@adaas/are';

declare class AreHTMLEngine extends AreEngine {
    get DefaultSyntax(): AreSyntax;
    /**
     * Inject AreHTMLSyntax into the container scope before loading
     *
     * @param container
     */
    init(scope: A_Scope): Promise<void>;
    protected rootElementMatcher(source: string, from: number, to: number, build: (raw: string, content: string, position: number, closing: string) => AreSyntaxTokenMatch): AreSyntaxTokenMatch | null;
    protected htmlElementMatcher(source: string, from: number, to: number, build: (raw: string, content: string, position: number, closing: string) => AreSyntaxTokenMatch): AreSyntaxTokenMatch | null;
    /**
     * Find the index of the closing `>` of an opening tag, skipping over
     * `>` characters that appear inside quoted attribute values.
     */
    private static findTagClose;
}

export { AreHTMLEngine };
