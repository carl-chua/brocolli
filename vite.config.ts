import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/vite-project/', // Replace with your repository name
  plugins: [react()],
  server: {
    host: true, // This will bind the server to your local IP address
  },
});
