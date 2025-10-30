/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['src/setupTests.js'],
    reporters: ['default', 'junit'],
    outputFile: 'junit.xml',          // Jenkins will pick this up
    coverage: { reporter: ['text', 'lcov'] }
  },
});
