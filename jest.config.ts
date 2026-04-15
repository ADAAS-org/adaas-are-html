import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    displayName: 'adaas-are-html',
    preset: 'ts-jest',
    testEnvironment: 'node',
    resetModules: true,
    rootDir: '.',
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
    moduleNameMapper: {
        // ── @adaas/are — main entry and all sub-path imports used internally by the dist ──
        "^@adaas/are$":                                       "<rootDir>/node_modules/@adaas/are/dist/node/index.js",
        "^@adaas/are/attribute/(.*)":                         "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreAttribute/$1.js",
        "^@adaas/are/compiler/(.*)":                          "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreCompiler/$1.js",
        "^@adaas/are/component/(.*)":                         "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreComponent/$1.js",
        "^@adaas/are/engine/(.*)":                            "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreEngine/$1.js",
        "^@adaas/are/event/(.*)":                             "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreEvent/$1.js",
        "^@adaas/are/instruction/types/(.*)":                 "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreInstruction/types/$1.js",
        "^@adaas/are/instruction/(.*)":                       "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreInstruction/$1.js",
        "^@adaas/are/interpreter/(.*)":                       "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreInterpreter/$1.js",
        "^@adaas/are/lifecycle/(.*)":                         "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreLifecycle/$1.js",
        "^@adaas/are/loader/(.*)":                            "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreLoader/$1.js",
        "^@adaas/are/node/(.*)":                              "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreNode/$1.js",
        "^@adaas/are/scene/(.*)":                             "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreScene/$1.js",
        "^@adaas/are/signals/entities/(.*)":                  "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreSignals/entities/$1.js",
        "^@adaas/are/signals/(.*)":                           "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreSignals/$1.js",
        "^@adaas/are/store/(.*)":                             "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreStore/$1.js",
        "^@adaas/are/syntax/(.*)":                            "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreSyntax/$1.js",
        "^@adaas/are/tokenizer/(.*)":                         "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreTokenizer/$1.js",
        "^@adaas/are/transformer/(.*)":                       "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreTransformer/$1.js",
        "^@adaas/are/watcher/(.*)":                           "<rootDir>/node_modules/@adaas/are/dist/node/lib/AreWatcher/$1.js",

        // ── @adaas/are-html internal path aliases (mirrors tsconfig.json paths) ──
        // Base ARE-HTML entities
        "@adaas/are-html/nodes/(.*)":        "<rootDir>/src/nodes/$1",
        "@adaas/are-html/attributes/(.*)":   "<rootDir>/src/attributes/$1",
        "@adaas/are-html/directives/(.*)":   "<rootDir>/src/directives/$1",
        "@adaas/are-html/instructions/(.*)": "<rootDir>/src/instructions/$1",
        "@adaas/are-html/watchers/(.*)":     "<rootDir>/src/watchers/$1",
        "@adaas/are-html/signals/(.*)":      "<rootDir>/src/signals/$1",
        // Custom lib exports
        "@adaas/are-html/style/(.*)":        "<rootDir>/src/lib/AreStyle/$1",
        "@adaas/are-html/directive/(.*)":    "<rootDir>/src/lib/AreDirective/$1",
        "@adaas/are-html/root/(.*)":         "<rootDir>/src/lib/AreRoot/$1",
        "@adaas/are-html/node":              "<rootDir>/src/lib/AreHTMLNode/AreHTMLNode",
        "@adaas/are-html/attribute":         "<rootDir>/src/lib/AreHTMLAttribute/AreHTML.attribute",
        // HTML engine basics
        "@adaas/are-html/compiler":          "<rootDir>/src/engine/AreHTML.compiler",
        "@adaas/are-html/constants":         "<rootDir>/src/engine/AreHTML.constants",
        "@adaas/are-html/context":           "<rootDir>/src/engine/AreHTML.context",
        "@adaas/are-html/engine":            "<rootDir>/src/engine/AreHTML.engine",
        "@adaas/are-html/interpreter":       "<rootDir>/src/engine/AreHTML.interpreter",
        "@adaas/are-html/lifecycle":         "<rootDir>/src/engine/AreHTML.lifecycle",
        "@adaas/are-html/tokenizer":         "<rootDir>/src/engine/AreHTML.tokenizer",
        "@adaas/are-html/transformer":       "<rootDir>/src/engine/AreHTML.transformer",
        "@adaas/are-html/types":             "<rootDir>/src/engine/AreHTML.types",
    },
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts']
};
export default config;