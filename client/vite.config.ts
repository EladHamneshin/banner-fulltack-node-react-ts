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
        setupFiles: "./src/__tests__/setup.ts",
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