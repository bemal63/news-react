import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { articlePlugin } from './server/article'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), articlePlugin()],
})
