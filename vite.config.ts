/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    'process.env': {}
  },
  resolve: {
    mainFields: ["module"],
  },
  test: {
    setupFiles: [resolve(__dirname, './setup.ts')],
    coverage: {
      lines: 65,
      branches: 65,
      functions: 65,
      statements: 65,
      provider: "c8",
      all: true,
      include: ["src/**/*.tsx", "src/**/*.ts", "src/**/**/*.ts", "src/**/**/*.tsx"],
      exclude: [
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/types.ts",
        "src/Consumer/Charts/*.tsx",
        "src/Consumer/Chart.tsx",
        "src/Consumer/DashboardCards/ExpensiveChart.tsx",
        "src/Consumer/DashboardCards/LineCard.tsx",
        "src/Consumer/DashboardCards/RevenueCard.tsx",
        "src/Vendor/utils.tsx",
        "src/Vendor/Pages/RenewableDetailsModal.tsx",
        "src/Vendor/Pages/Electric.tsx",
        "src/Vendor/Pages/Water.tsx",
        "src/Vendor/Pages/Gas.tsx"
      ],
      reporter: ['text', 'json-summary', 'json'],
    },
    globals: true,
    environment: "jsdom",
    deps: {
      inline: ['vitest-canvas-mock'],
    },
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
