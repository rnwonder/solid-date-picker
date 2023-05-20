// vite.config.ts
import { defineConfig } from "file:///C:/Users/rnwon/Documents/GitHub/solid-wonder-ui/packages/Datepicker/node_modules/.pnpm/vite@4.1.1_@types+node@20.2.1_sass@1.62.1/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import solidPlugin from "file:///C:/Users/rnwon/Documents/GitHub/solid-wonder-ui/packages/Datepicker/node_modules/.pnpm/vite-plugin-solid@2.5.0_solid-js@1.6.12_vite@4.1.1/node_modules/vite-plugin-solid/dist/esm/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\rnwon\\Documents\\GitHub\\solid-wonder-ui\\packages\\Datepicker";
var vite_config_default = defineConfig({
  build: {
    target: "es2015",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web"],
      output: {
        preserveModules: true,
        exports: "named"
      }
    }
  },
  plugins: [
    solidPlugin()
  ],
  server: {
    port: 3e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxybndvblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHNvbGlkLXdvbmRlci11aVxcXFxwYWNrYWdlc1xcXFxEYXRlcGlja2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxybndvblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHNvbGlkLXdvbmRlci11aVxcXFxwYWNrYWdlc1xcXFxEYXRlcGlja2VyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ybndvbi9Eb2N1bWVudHMvR2l0SHViL3NvbGlkLXdvbmRlci11aS9wYWNrYWdlcy9EYXRlcGlja2VyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHNvbGlkUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1zb2xpZFwiO1xuaW1wb3J0IHsgRE9NRWxlbWVudHMsIFNWR0VsZW1lbnRzIH0gZnJvbSBcInNvbGlkLWpzL3dlYi9kaXN0L2Rldi5janNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6IFwiZXMyMDE1XCIsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxuICAgICAgZm9ybWF0czogW1wiZXNcIiwgXCJjanNcIl0sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGluZGV4LiR7Zm9ybWF0fS5qc2AsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1wic29saWQtanNcIiwgXCJzb2xpZC1qcy93ZWJcIl0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxuICAgICAgICBleHBvcnRzOiBcIm5hbWVkXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBzb2xpZFBsdWdpbigpLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJZLFNBQVMsb0JBQW9CO0FBQ3hhLFNBQVMsZUFBZTtBQUN4QixPQUFPLGlCQUFpQjtBQUZ4QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVLENBQUMsV0FBVyxTQUFTO0FBQUEsSUFDakM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxZQUFZLGNBQWM7QUFBQSxNQUNyQyxRQUFRO0FBQUEsUUFDTixpQkFBaUI7QUFBQSxRQUNqQixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
