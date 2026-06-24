// jsdom test environments do not expose Node's TextEncoder/TextDecoder globals,
// which the @adaas codec layer requires. Polyfill them when missing (no-op under
// the default `node` test environment where they already exist).
import { TextEncoder, TextDecoder } from 'util';
if (typeof (globalThis as any).TextEncoder === 'undefined') {
    (globalThis as any).TextEncoder = TextEncoder;
}
if (typeof (globalThis as any).TextDecoder === 'undefined') {
    (globalThis as any).TextDecoder = TextDecoder;
}

// import { A_Context } from '@adaas/a-concept/a-context';
// import fs from 'fs';

// /**
//  * Base hooks for tests
//  */
// beforeAll(async () => {

//     return Promise.resolve();
// });

// afterAll(async () => {
//     try {
//         fs.unlinkSync('a-concept.conf.json');

//     } catch (error) {

//     }
//     return Promise.resolve();
// });

// beforeEach(async () => {
//     A_Context.reset();
//     return Promise.resolve();
// });

// afterEach(async () => {
//     A_Context.reset();
//     return Promise.resolve();
// });