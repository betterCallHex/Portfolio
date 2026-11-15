import { resolve } from 'node:path';
import devServer from '@hono/vite-dev-server';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
      devServer({ entry: 'server/dev.ts', exclude: [/^(?!\/api\/).*/] }),
    ],
    resolve: {
      alias: {
        '@': resolve(import.meta.dirname, './src'),
      },
    },
  };
});
