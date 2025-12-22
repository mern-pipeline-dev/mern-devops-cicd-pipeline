import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Changed this line
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), // This now uses the SWC plugin you have installed
    tailwindcss(),
  ],
})