import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import step here is to create a proxy, so that everytime someone goes to /api, we point them to our target
// basically going "each time you see the /api, add http://localhost:3000" at the beginning
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
      target: 'http://localhost:3000',
      secure:false,
      },
    },
  },
   
  plugins: [react()],
})
