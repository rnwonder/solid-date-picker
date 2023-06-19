// vite.config.ts
import { defineConfig } from "file:///C:/Users/rnwon/Documents/GitHub/solid-wonder-ui/packages/Datepicker/node_modules/.pnpm/vite@4.1.1_@types+node@20.2.1_sass@1.62.1/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import solidPlugin from "file:///C:/Users/rnwon/Documents/GitHub/solid-wonder-ui/packages/Datepicker/node_modules/.pnpm/vite-plugin-solid@2.5.0_solid-js@1.6.12_vite@4.1.1/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import dts from "file:///C:/Users/rnwon/Documents/GitHub/solid-wonder-ui/packages/Datepicker/node_modules/.pnpm/vite-plugin-dts@2.3.0_@types+node@20.2.1_rollup@3.24.1_vite@4.1.1/node_modules/vite-plugin-dts/dist/index.mjs";
import terser from "file:///C:/Users/rnwon/Documents/GitHub/solid-wonder-ui/packages/Datepicker/node_modules/.pnpm/@rollup+plugin-terser@0.4.3_rollup@3.24.1/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "C:\\Users\\rnwon\\Documents\\GitHub\\solid-wonder-ui\\packages\\Datepicker";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es"],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web"],
      output: {
        preserveModules: true,
        exports: "named"
      },
      plugins: [terser()]
    }
  },
  plugins: [
    solidPlugin(),
    dts({
      insertTypesEntry: true,
      outputDir: "types"
    })
  ],
  server: {
    port: 3101
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxybndvblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHNvbGlkLXdvbmRlci11aVxcXFxwYWNrYWdlc1xcXFxEYXRlcGlja2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxybndvblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHNvbGlkLXdvbmRlci11aVxcXFxwYWNrYWdlc1xcXFxEYXRlcGlja2VyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ybndvbi9Eb2N1bWVudHMvR2l0SHViL3NvbGlkLXdvbmRlci11aS9wYWNrYWdlcy9EYXRlcGlja2VyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBzb2xpZFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tc29saWRcIjtcclxuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XHJcbmltcG9ydCB0ZXJzZXIgZnJvbSBcIkByb2xsdXAvcGx1Z2luLXRlcnNlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXHJcbiAgICAgIGZvcm1hdHM6IFtcImVzXCJdLFxyXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGluZGV4LiR7Zm9ybWF0fS5qc2AsXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1wic29saWQtanNcIiwgXCJzb2xpZC1qcy93ZWJcIl0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIHByZXNlcnZlTW9kdWxlczogdHJ1ZSxcclxuICAgICAgICBleHBvcnRzOiBcIm5hbWVkXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHBsdWdpbnM6IFt0ZXJzZXIoKV0sXHJcbiAgICB9LFxyXG5cclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHNvbGlkUGx1Z2luKCksXHJcbiAgICBkdHMoe1xyXG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxyXG4gICAgICBvdXRwdXREaXI6IFwidHlwZXNcIixcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiAzMTAxLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJZLFNBQVMsb0JBQW9CO0FBQ3hhLFNBQVMsZUFBZTtBQUN4QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBSm5CLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsU0FBUyxDQUFDLElBQUk7QUFBQSxNQUNkLFVBQVUsQ0FBQyxXQUFXLFNBQVM7QUFBQSxJQUNqQztBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFlBQVksY0FBYztBQUFBLE1BQ3JDLFFBQVE7QUFBQSxRQUNOLGlCQUFpQjtBQUFBLFFBQ2pCLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxTQUFTLENBQUMsT0FBTyxDQUFDO0FBQUEsSUFDcEI7QUFBQSxFQUVGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixJQUFJO0FBQUEsTUFDRixrQkFBa0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
