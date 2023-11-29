//vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        // setupFiles: "./src/tests/setup.ts",
        setupFiles: "C:/Users/yonathan/u/final_project/banner-fulltack-node-react-ts/client/src/__tests__/setup.ts",
        include: ['**/?(*.)test.ts?(x)'],
    },
});