import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./lib/test/testSetup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'lib/test/',
        '**/*.test.ts',
        '**/*.config.ts',
        'src/',
      ],
    },
    testTimeout: 10000,
  },
});
