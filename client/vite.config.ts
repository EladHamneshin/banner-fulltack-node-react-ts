import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    base: '/banner',

    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/__tests__/setup.ts",
        include: ['**/?(*.)test.ts?(x)'],
    },

    server: {
      port: 5173,
      
    },
  });
};