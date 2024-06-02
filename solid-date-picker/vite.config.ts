import { defineConfig } from "vite";
import { resolve } from "path";
import solidPlugin from "vite-plugin-solid";
import dts from "vite-plugin-dts";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        timePicker: resolve(__dirname, "src/timePicker.ts"),
        rnPortal: resolve(__dirname, "src/rnPortal.ts"),
        monthSelector: resolve(__dirname, "src/monthSelector.ts"),
        dateMath: resolve(__dirname, "src/dateMath.ts"),
        calendarArea: resolve(__dirname, "src/calendarArea.ts"),
        popover: resolve(__dirname, "src/popover.ts"),
        yearSelector: resolve(__dirname, "src/yearSelector.ts"),
        calendar: resolve(__dirname, "src/calendar.ts"),
        utilities: resolve(__dirname, "src/utilities.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web"],
      output: {
        preserveModules: true,
        exports: "named",
      },
      plugins: [terser()],
    },
  },
  plugins: [
    solidPlugin(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  server: {
    port: 3101,
  },
  resolve: {
    mainFields: ["module", "main"],
    alias: {
      "@rnwonder/solid-date-picker": resolve(__dirname, "src"),
    },
  },
});
