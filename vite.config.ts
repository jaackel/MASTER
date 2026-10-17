import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 8080,
  },
  preview: {
    allowedHosts: ["sitevision.com.br", "www.sitevision.com.br", "masteragent.com.br", "www.masteragent.com.br"],
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
    dedupe: ["react", "react-dom", "@tanstack/react-query", "@tanstack/query-core"],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      // Gera HTML estático de todas as páginas em dist/client (deploy na Cloudflare sem servidor)
      prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    react(),
  ],
});
