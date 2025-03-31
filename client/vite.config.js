import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      "application/javascript": ["js", "jsx"],
      "text/javascript": ["js", "jsx"], // Add this line to ensure compatibility
    },
  },
});
