import { defineConfig } from "vite";
import { resolve } from "path";
import solidPlugin from "vite-plugin-solid";
import { DOMElements, SVGElements } from "solid-js/web/dist/dev.cjs";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web"],
      output: {
        preserveModules: true,
        exports: "named",
      },
    },
  },
  plugins: [
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
});
