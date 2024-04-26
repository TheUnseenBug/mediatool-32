import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'app/',server: {
    fs: {
      cachedChecks: false
    }
  },
  plugins:[react()],
})
