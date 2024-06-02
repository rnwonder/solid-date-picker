import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "lib/main.ts"),
        dateMath: resolve(__dirname, "lib/dateMath.ts"),
        utils: resolve(__dirname, "lib/utils.ts"),
        datePicker: resolve(__dirname, "lib/datePicker.ts"),
      },
      formats: ["es"],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    mainFields: ["module", "main"],
    alias: {
      "@rnwonder/simple-datejs": resolve(__dirname, "lib"),
    },
  },
});
