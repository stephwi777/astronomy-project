import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'



// CONFIG

export default defineConfig({
  base: '/starling/',
  plugins: [react()],
})
