import http from "http";
import type { AppDescriptor } from "../../src/runtime/AppRegistry.fragment";
import { AppBackend } from "./AppBackend";


/** Tiny themed hashtag generator — stands in for a real marketing service. */
const HASHTAG_BANK: Record<string, string[]> = {
    launch: ['ProductLaunch', 'ShipIt', 'NowLive', 'BuildInPublic'],
    runtime: ['RuntimeLoading', 'WebPerf', 'LazyLoad', 'Microfrontends'],
    team: ['TeamWork', 'Hiring', 'Culture', 'RemoteWork'],
    growth: ['GrowthMindset', 'Startup', 'SaaS', 'GoToMarket'],
};

const DEFAULT_TAGS = ['Engineering', 'Innovation', 'TechLeadership', 'OpenSource'];


/**
 * MarketingAppBackend — the Marketing app's OWN server.
 *
 * Frontend: marketing-app / post-editor / post-preview (the marketing bundle).
 * Backend: a single `/apps/marketing/api/hashtags` endpoint that returns topic
 * hashtag suggestions, proving the app ships with its own server logic.
 */
export class MarketingAppBackend implements AppBackend {

    readonly entry = 'src/apps/marketing/index.ts';

    readonly descriptor: AppDescriptor = {
        id: 'marketing',
        name: 'Marketing',
        icon: '📣',
        accent: '#2f6df6',
        tagline: 'Draft a LinkedIn post and pull hashtag ideas from the app backend.',
        rootTag: 'marketing-app',
        bundle: '/apps/marketing/app.js',
        api: '/apps/marketing/api',
        components: [
            { tag: 'marketing-app', export: 'MarketingApp' },
            { tag: 'post-editor', export: 'PostEditor' },
            { tag: 'post-preview', export: 'PostPreview' },
        ],
    };

    handle(
        pathname: string,
        query: URLSearchParams,
        _req: http.IncomingMessage,
        res: http.ServerResponse,
    ): boolean {
        if (pathname === '/apps/marketing/api/hashtags') {
            const topic = (query.get('topic') || '').toLowerCase();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ hashtags: this.suggest(topic) }));
            return true;
        }
        return false;
    }

    protected suggest(topic: string): string[] {
        const matched = Object.keys(HASHTAG_BANK)
            .filter(key => topic.includes(key))
            .flatMap(key => HASHTAG_BANK[key]);

        const tags = matched.length ? matched : DEFAULT_TAGS;
        // De-dupe + cap.
        return Array.from(new Set(tags)).slice(0, 6);
    }
}
