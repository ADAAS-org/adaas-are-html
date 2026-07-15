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
        // ── @adaas/are-html internal path aliases (mirrors tsconfig.json paths) ──
        // Base ARE-HTML entities
        "@adaas/are-html/nodes/(.*)":        "<rootDir>/src/nodes/$1",
        "@adaas/are-html/attributes/(.*)":   "<rootDir>/src/attributes/$1",
        "@adaas/are-html/directives/(.*)":   "<rootDir>/src/directives/$1",
        "@adaas/are-html/instructions/(.*)": "<rootDir>/src/instructions/$1",
        "@adaas/are-html/watchers/(.*)":     "<rootDir>/src/watchers/$1",
        "@adaas/are-html/signals/(.*)":      "<rootDir>/src/signals/$1",
        "@adaas/are-html/helpers/(.*)":      "<rootDir>/src/helpers/$1",
        // Custom lib exports
        "@adaas/are-html/style/(.*)":        "<rootDir>/src/lib/AreStyle/$1",
        "@adaas/are-html/directive/(.*)":    "<rootDir>/src/lib/AreDirective/$1",
        "@adaas/are-html/root/(.*)":         "<rootDir>/src/lib/AreRoot/$1",
        "@adaas/are-html/dynamic/(.*)":      "<rootDir>/src/lib/AreDynamic/$1",
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