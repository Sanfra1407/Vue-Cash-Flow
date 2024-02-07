import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { terser } from 'rollup-plugin-terser';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3080,
  },
  build: {
    rollupOptions: {
      plugins: [terser({
        compress: {
          defaults: false,
          drop_console: true
        },
        mangle: {
          eval: true,
          module: true,
          toplevel: true,
          safari10: true,
          properties: false
        },
        output: {
          comments: false,
          ecma: '2020'
        }
      })],
    },
  },
})
