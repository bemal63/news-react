import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { articlePlugin } from './server/viteArticlePlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), articlePlugin()],
})
