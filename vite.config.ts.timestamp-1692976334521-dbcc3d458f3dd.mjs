// vite.config.ts
import { defineConfig } from "file:///C:/Users/gabri/Desktop/GitHub/mist/mist_frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/gabri/Desktop/GitHub/mist/mist_frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 4e3
    // you can replace this port with any port
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnYWJyaVxcXFxEZXNrdG9wXFxcXEdpdEh1YlxcXFxtaXN0XFxcXG1pc3RfZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGdhYnJpXFxcXERlc2t0b3BcXFxcR2l0SHViXFxcXG1pc3RcXFxcbWlzdF9mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZ2FicmkvRGVza3RvcC9HaXRIdWIvbWlzdC9taXN0X2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgc2VydmVyOiB7XG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICB1c2VQb2xsaW5nOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBob3N0OiB0cnVlLCAvLyBuZWVkZWQgZm9yIHRoZSBEb2NrZXIgQ29udGFpbmVyIHBvcnQgbWFwcGluZyB0byB3b3JrXG4gICAgICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgICAgIHBvcnQ6IDQwMDAsIC8vIHlvdSBjYW4gcmVwbGFjZSB0aGlzIHBvcnQgd2l0aCBhbnkgcG9ydFxuICAgIH0sXG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdWLFNBQVMsb0JBQW9CO0FBQzdXLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixRQUFRO0FBQUEsSUFDSixPQUFPO0FBQUEsTUFDSCxZQUFZO0FBQUEsSUFDaEI7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUNyQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=