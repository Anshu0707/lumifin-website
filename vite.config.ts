import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

// Netlify serves the hand-written pages in public/ at pretty URLs (/link,
// /download), but the Vite dev server's SPA fallback would hand those paths to
// index.html (the React app) — the wrong page entirely. Mirror Netlify so both
// are testable locally and via ngrok.
//
// Keep this list in sync with the static pages in public/. A page missing from
// it still works in production and still passes the verifier (which serves
// dist/, where file routing applies), and fails only in `npm run dev` — so the
// breakage shows up at the worst moment, while someone is trying to test.
const STATIC_PRETTY_PAGES = ['link', 'download'];

const staticPagePrettyUrls = (): Plugin => {
  const pattern = new RegExp(`^/(${STATIC_PRETTY_PAGES.join('|')})(\\?|$)`);
  const rewrite = (req: {url?: string}) => {
    if (req.url && pattern.test(req.url)) {
      req.url = req.url.replace(/^\/([^?]+)/, '/$1.html');
    }
  };
  return {
    name: 'static-page-pretty-urls',
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
    plugins: [react(), tailwindcss(), staticPagePrettyUrls()],
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
