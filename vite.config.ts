/// <reference types="vitest" />
import { defineConfig, resolveBaseUrl } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    mainFields: ["module"],
  },
  test: {
    setupFiles: [resolve(__dirname, './setup.ts')],
    reporters: 'dot',
    coverage: {
      lines: 65,
      branches: 65,
      functions: 65,
      statements: 65,
      provider: "c8",
      all: true,
      include: ["src/**/*.tsx", "src/**/*.ts", "src/**/**/*.ts", "src/**/**/*.tsx"],
      exclude: ["src/main.tsx", "src/vite-env.d.ts", "src/types.ts"],
      reporter: ['text', 'json-summary', 'json'],
    },
    globals: true,
    environment: "jsdom",
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'heading-color': '#f00',
        },
        javascriptEnabled: true,
      },
    },
  },
})
