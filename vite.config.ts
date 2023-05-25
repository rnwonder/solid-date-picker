import { defineConfig } from "vite";
import { resolve } from "path";
import solidPlugin from "vite-plugin-solid";
import dts from "vite-plugin-dts";
import terser from '@rollup/plugin-terser';

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
      plugins: [terser()]
    },
  },
  plugins: [
    solidPlugin(),
    dts({
      insertTypesEntry: true,
      outputDir: "types",

    }),
  ],
  server: {
    port: 3101,
  },
});
