import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = '/matesha-app/'

export default defineConfig({
  plugins: [react()],
  base,
})
