/**
 * `server-only` throws on import unless the bundler resolves its server
 * condition. Vitest does not, so any module that guards itself with it — the
 * analytics queries, the crawler log — was untestable. The package is a
 * build-time guard with no runtime behaviour, so an empty module is exactly
 * what it does on the server.
 */
export {};
