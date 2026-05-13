import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Для GitHub Pages укажите имя репозитория, например: base: '/matesha-app/'
// Либо задайте переменную: BASE=/repo-name/ npm run build
const base = process.env.BASE ?? './'

export default defineConfig({
  plugins: [react()],
  base,
})
