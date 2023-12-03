//vite.config.ts
/// <reference types="vitest" />



import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/tests/setup.ts",
        // setupFiles: "C:/Users/yonathan/u/final_project/banner-fulltack-node-react-ts/client/src/__tests__/setup.ts",
        include: ['**/?(*.)test.ts?(x)'],
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: process.env.VITE_API_URI,
          changeOrigin: true,
        },
      },
    },
  });
};