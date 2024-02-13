import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { createStyleImportPlugin } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
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
  };

  if (command !== 'serve') {
    config.base = '/todo-board-uue7.onrender.com/';
  }

  return config;
});
