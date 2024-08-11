import { defineConfig, ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

import env from './env-validator';

export default () => {
  const config = env();

  const proxyConfig: Record<string, ProxyOptions> = {};

  const proxyUrlsLabels = ['fintech', 'shipment', 'lov', 'shipment_fintrans', 'notes', 'documents'];

  proxyUrlsLabels.forEach(label => {
    const pathKey = `${label.toUpperCase()}_ROOT_PATH`;
    const urlKey = `${label.toUpperCase()}_BSL_URL`;

    proxyConfig[config[pathKey]] = {
      target: config[urlKey],
      rewrite: path => path.replace(RegExp(`^${config[pathKey]}`), ''),
      changeOrigin: true,
      headers: {
        origin: config[urlKey],
      },
      configure(proxy) {
        proxy.on('proxyReq', function (...args) {
          // there are four arguments passed, req, reply, resp, options
          // use this folder to debug api requests, see if requests are formulated correctly
          // to see content of each arg, you can console log them individually
        });
      },
    };
  });

  return defineConfig({
    plugins: [react()],
    esbuild: {
      target: 'ES2020',
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
    build: {
      outDir: 'build',
      target: 'es2015',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-router-dom', 'react-dom', 'web-vitals'],
            common: ['react-query', 'antd', 'dayjs'],
            data: ['chart.js', 'react-chartjs-2'],
            utils: ['lodash.camelcase', 'lodash.random', 'lodash.startcase', 'lodash.uniqby'],
          },
        },
      },
    },
    resolve: {
      alias: {
        http: 'rollup-plugin-node-polyfills/polyfills/http',
        https: 'rollup-plugin-node-polyfills/polyfills/http',
        stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        // fs: 'rollup-plugin-node-polyfills/polyfills/fs',
        events: 'rollup-plugin-node-polyfills/polyfills/events',
        url: 'rollup-plugin-node-polyfills/polyfills/url',
        querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
        zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
        util: 'util',
        './img': '/src/assets/img',
        './files': '/src/assets/files',
      },
    },
    define: {
      'process.env': {
        ...(process.env ?? {}),
        VERSION: process.env.npm_package_version,
        ...config
      },
    },
    server: {
      port: 3000,
      open: true,
      proxy: proxyConfig,
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      open: true,
      proxy: proxyConfig,
    },
  });
};
