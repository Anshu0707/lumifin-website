import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

// Netlify serves public/link.html at the pretty URL /link, but the Vite dev
// server's SPA fallback would hand /link to index.html (the React app) — the
// wrong page entirely. Mirror Netlify so the bridge is testable via ngrok.
const linkBridgePrettyUrl = (): Plugin => {
  const rewrite = (req: {url?: string}) => {
    if (req.url && /^\/link(\?|$)/.test(req.url)) {
      req.url = req.url.replace(/^\/link/, '/link.html');
    }
  };
  return {
    name: 'link-bridge-pretty-url',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
  };
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), linkBridgePrettyUrl()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'motion': ['motion/react'],
            'i18n': ['i18next', 'react-i18next'],
          },
        },
      },
    },
    server: {
      host: true,
      // Leading dot = any subdomain, so the allowlist survives every new
      // ngrok/tunnel URL (used to test the /link bridge before merge). Vite
      // blocks unknown Host headers by default for security; this opens the
      // common tunnel subdomains (ngrok, cloudflared, localtunnel).
      allowedHosts: [
        '.ngrok-free.dev',
        '.ngrok-free.app',
        '.ngrok.app',
        '.ngrok.io',
        '.loca.lt',
        '.trycloudflare.com',
      ],
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
