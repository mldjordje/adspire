import "@testing-library/jest-dom/vitest";

// Node ships an experimental `localStorage` global that wins over jsdom's, and
// without `--localstorage-file` it is an object with no methods at all. Code
// under test guards its storage access, so the result is silently doing
// nothing rather than a failure — which would make a passing test meaningless.
// A tiny in-memory store restores the real contract.
if (typeof window !== "undefined" && typeof window.localStorage?.setItem !== "function") {
  const store = new Map<string, string>();
  const memoryStorage: Storage = {
    get length() {
      return store.size;
    },
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, String(value)),
    removeItem: (key: string) => void store.delete(key),
    clear: () => store.clear(),
  };
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: memoryStorage,
  });
}
