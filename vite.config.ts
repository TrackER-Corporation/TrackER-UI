/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      lines: 75,
      branches: 75,
      functions: 75,
      statements: 75,
      provider: "c8",
      all: true,
      include: ["src/**/*.tsx", "src/**/*.ts"],
      exclude: ["src/main.tsx", "src/vite-env.d.ts"],
      reporter: ['text', 'json-summary', 'json'],
    },
    globals: true,
    environment: "jsdom",

  },
})
