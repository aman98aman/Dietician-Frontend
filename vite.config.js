import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default {
  server: {
    host: '0.0.0.0',  // Bind to all IP addresses
    port: 5173,       // The default port
    strictPort: true  // Fail if port 5173 is in use
  }
}

