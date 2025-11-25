import { defineConfig, loadEnv } from "vite";
import zaloMiniApp from "zmp-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, __dirname, ''); 
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [zaloMiniApp(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        // Tất cả endpoints giờ đều dùng /mini-app/v1 prefix
        // Modern endpoints with /mini-app/v1 prefix
        '/api': {
          target: env.VITE_API_BASE_URL || 'https://api.socdo.vn',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => {
            // Remove /api prefix and add /mini-app/v1 prefix
            const cleanPath = path.replace(/^\/api/, '');
            return `/mini-app/v1${cleanPath}`;
          },
          configure: (proxy, _options) => {
            // Handle preflight OPTIONS requests for CORS
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              // Vite proxy automatically forwards most headers, but we ensure custom headers are preserved
              // Headers like Token-Seller, Authorization, Shop-ID are automatically forwarded by Vite
              
              // Log for debugging (only in dev)
              if (env.DEV || mode === 'development') {
                console.log(`[PROXY] ${req.method} ${req.url} -> ${proxyReq.path}`);
              }
            });
            
            // Add CORS headers to all responses
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              // Set CORS headers if not already set by server
              const corsHeaders = {
                'access-control-allow-origin': proxyRes.headers['access-control-allow-origin'] || '*',
                'access-control-allow-methods': proxyRes.headers['access-control-allow-methods'] || 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
                'access-control-allow-headers': proxyRes.headers['access-control-allow-headers'] || 'Content-Type, Authorization, Token-Seller, Shop-ID, X-Requested-With, Accept',
                'access-control-allow-credentials': proxyRes.headers['access-control-allow-credentials'] || 'true',
                'access-control-expose-headers': proxyRes.headers['access-control-expose-headers'] || 'Token-Seller, Authorization',
              };
              
              // Only set headers if server didn't provide them
              Object.entries(corsHeaders).forEach(([key, value]) => {
                if (!proxyRes.headers[key.toLowerCase()]) {
                  proxyRes.headers[key.toLowerCase()] = value as string;
                }
              });
              
              // Handle OPTIONS preflight requests
              if (req.method === 'OPTIONS') {
                proxyRes.statusCode = 200;
                proxyRes.statusMessage = 'OK';
              }
            });
            
            // Error handling
            proxy.on('error', (err, req, _res) => {
              console.error(`[PROXY] Error for ${req.method} ${req.url}:`, err.message);
            });
          },
        },
        // Dev proxy for Zalo OA API with token injection to avoid CORS
        // Usage: fetch('/oa1/<oa-endpoint>') will proxy to target with OA token #1
        '/oa1': {
          target: env.VITE_ZALO_OA_PROXY_TARGET || 'https://openapi.zalo.me',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/oa1/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const token = env.ZALO_OA_ACCESS_TOKEN || env.VITE_ZALO_OA_ACCESS_TOKEN || '';
              if (token) {
                // Adjust header/key according to OA API requirements
                proxyReq.setHeader('Authorization', `Bearer ${token}`);
              }
            });
          }
        },
        // Second OA token route: fetch('/oa2/...')
        '/oa2': {
          target: env.VITE_ZALO_OA_PROXY_TARGET || 'https://openapi.zalo.me',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/oa2/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const token2 = env.ZALO_OA_ACCESS_TOKEN_2 || env.VITE_ZALO_OA_ACCESS_TOKEN_2 || '';
              if (token2) {
                proxyReq.setHeader('Authorization', `Bearer ${token2}`);
              }
            });
          }
        }
      }
    }
  });
};
