import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: '/',
  optimizeDeps: {
    include: ['react-quill'],
  },
  plugins: [
    react({
      include: /\.(jsx|tsx)$/,
      babel: {
        plugins: ['styled-components'],
        babelrc: false,
        configFile: false,
      },
    }),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'react-quill',
          resolveStyle: (name) => `react-quill/dist/quill.${name}.css`,
        },
      ],
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
    extensions: ['.js', '.jsx'],
  },
}));
