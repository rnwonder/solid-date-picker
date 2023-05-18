import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { DOMElements, SVGElements } from "solid-js/web/dist/dev.cjs";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.tsx",
      formats: ["es", "cjs", "umd"],
      fileName: "index",
      name: "solidDatepicker",
    },
    minify: false,
    rollupOptions: {
      external: ["solid-js", "solid-js/web", "solid-styled-components"],
    },
    polyfillDynamicImport: false,
  },
  plugins: [
    solidPlugin({
      solid: {
        moduleName: "solid-js/web",
        // @ts-ignore
        generate: "dynamic",
        renderers: [
          {
            name: "dom",
            moduleName: "solid-js/web",
            elements: [...DOMElements.values(), ...SVGElements.values()],
          },
          {
            name: "universal",
            moduleName: "/src/renderer.tsx",
            elements: [],
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
