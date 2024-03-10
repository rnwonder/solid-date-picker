// vite.config.ts
import { defineConfig } from "file:///C:/Users/rnwon/Documents/GitHub/solid-date-picker/solidjs/node_modules/.pnpm/vite@5.0.12_@types+node@20.11.16_sass@1.70.0/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import solidPlugin from "file:///C:/Users/rnwon/Documents/GitHub/solid-date-picker/solidjs/node_modules/.pnpm/vite-plugin-solid@2.9.1_solid-js@1.8.14_vite@5.0.12/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import dts from "file:///C:/Users/rnwon/Documents/GitHub/solid-date-picker/solidjs/node_modules/.pnpm/vite-plugin-dts@2.3.0_@types+node@20.11.16_vite@5.0.12/node_modules/vite-plugin-dts/dist/index.mjs";
import terser from "file:///C:/Users/rnwon/Documents/GitHub/solid-date-picker/solidjs/node_modules/.pnpm/@rollup+plugin-terser@0.4.4/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "C:\\Users\\rnwon\\Documents\\GitHub\\solid-date-picker\\solidjs";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__vite_injected_original_dirname, "src/index.ts"),
        timePicker: resolve(__vite_injected_original_dirname, "src/timePicker.ts"),
        rnPortal: resolve(__vite_injected_original_dirname, "src/rnPortal.ts"),
        monthSelector: resolve(__vite_injected_original_dirname, "src/monthSelector.ts"),
        dateMath: resolve(__vite_injected_original_dirname, "src/dateMath.ts"),
        calendarArea: resolve(__vite_injected_original_dirname, "src/calendarArea.ts"),
        popover: resolve(__vite_injected_original_dirname, "src/popover.ts"),
        yearSelector: resolve(__vite_injected_original_dirname, "src/yearSelector.ts"),
        datePickerStandAlone: resolve(__vite_injected_original_dirname, "src/calendar.ts"),
        utilities: resolve(__vite_injected_original_dirname, "src/utilities.ts")
      },
      formats: ["es"]
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
      insertTypesEntry: true
    })
  ],
  server: {
    port: 3101
  },
  resolve: {
    mainFields: ["module", "main"],
    alias: {
      "@rnwonder/solid-date-picker": resolve(__vite_injected_original_dirname, "src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxybndvblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHNvbGlkLWRhdGUtcGlja2VyXFxcXHNvbGlkanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHJud29uXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcc29saWQtZGF0ZS1waWNrZXJcXFxcc29saWRqc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcm53b24vRG9jdW1lbnRzL0dpdEh1Yi9zb2xpZC1kYXRlLXBpY2tlci9zb2xpZGpzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBzb2xpZFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tc29saWRcIjtcclxuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XHJcbmltcG9ydCB0ZXJzZXIgZnJvbSBcIkByb2xsdXAvcGx1Z2luLXRlcnNlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiB7XHJcbiAgICAgICAgaW5kZXg6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9pbmRleC50c1wiKSxcclxuICAgICAgICB0aW1lUGlja2VyOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvdGltZVBpY2tlci50c1wiKSxcclxuICAgICAgICByblBvcnRhbDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3JuUG9ydGFsLnRzXCIpLFxyXG4gICAgICAgIG1vbnRoU2VsZWN0b3I6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9tb250aFNlbGVjdG9yLnRzXCIpLFxyXG4gICAgICAgIGRhdGVNYXRoOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvZGF0ZU1hdGgudHNcIiksXHJcbiAgICAgICAgY2FsZW5kYXJBcmVhOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvY2FsZW5kYXJBcmVhLnRzXCIpLFxyXG4gICAgICAgIHBvcG92ZXI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9wb3BvdmVyLnRzXCIpLFxyXG4gICAgICAgIHllYXJTZWxlY3RvcjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3llYXJTZWxlY3Rvci50c1wiKSxcclxuICAgICAgICBkYXRlUGlja2VyU3RhbmRBbG9uZTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2RhdGVQaWNrZXJTdGFuZEFsb25lLnRzXCIpLFxyXG4gICAgICAgIHV0aWxpdGllczogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3V0aWxpdGllcy50c1wiKSxcclxuICAgICAgfSxcclxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1wic29saWQtanNcIiwgXCJzb2xpZC1qcy93ZWJcIl0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIHByZXNlcnZlTW9kdWxlczogdHJ1ZSxcclxuICAgICAgICBleHBvcnRzOiBcIm5hbWVkXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHBsdWdpbnM6IFt0ZXJzZXIoKV0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgc29saWRQbHVnaW4oKSxcclxuICAgIGR0cyh7XHJcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzEwMSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIG1haW5GaWVsZHM6IFtcIm1vZHVsZVwiLCBcIm1haW5cIl0sXHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBybndvbmRlci9zb2xpZC1kYXRlLXBpY2tlclwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJXLFNBQVMsb0JBQW9CO0FBQ3hZLFNBQVMsZUFBZTtBQUN4QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBSm5CLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxRQUNMLE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDeEMsWUFBWSxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLFFBQ2xELFVBQVUsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxRQUM5QyxlQUFlLFFBQVEsa0NBQVcsc0JBQXNCO0FBQUEsUUFDeEQsVUFBVSxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBLFFBQzlDLGNBQWMsUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQSxRQUN0RCxTQUFTLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsUUFDNUMsY0FBYyxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBLFFBQ3RELHNCQUFzQixRQUFRLGtDQUFXLDZCQUE2QjtBQUFBLFFBQ3RFLFdBQVcsUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUNsRDtBQUFBLE1BQ0EsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFlBQVksY0FBYztBQUFBLE1BQ3JDLFFBQVE7QUFBQSxRQUNOLGlCQUFpQjtBQUFBLFFBQ2pCLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxTQUFTLENBQUMsT0FBTyxDQUFDO0FBQUEsSUFDcEI7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixJQUFJO0FBQUEsTUFDRixrQkFBa0I7QUFBQSxJQUNwQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFlBQVksQ0FBQyxVQUFVLE1BQU07QUFBQSxJQUM3QixPQUFPO0FBQUEsTUFDTCwrQkFBK0IsUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDekQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
