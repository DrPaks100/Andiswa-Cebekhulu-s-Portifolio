import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: https://drpaks100.github.io/Andiswa-Cebekhulu-s-Portifolio/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/Andiswa-Cebekhulu-s-Portifolio/" : "/",
}));
