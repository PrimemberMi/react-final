import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 将前端的 //.netlify/functions 请求转发到 9999 端口
      "/.netlify/functions": "http://localhost:9999",
    },
  },
});