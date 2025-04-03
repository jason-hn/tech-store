import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// HTTPS configuration
let httpsConfig = undefined
const certPath = path.resolve(__dirname, '../server/config/certificates/localhost+2.pem')
const keyPath = path.resolve(__dirname, '../server/config/certificates/localhost+2-key.pem')

// Only use HTTPS if certificates exist
if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  console.warn('mkcert certificates found. HTTPS will be enabled properly.')
  
  httpsConfig = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  }
} else {
  console.warn('mkcert certificates not found. HTTPS will not be enabled properly.')
  console.warn('Expected certificate paths:')
  console.warn(` - Key: ${keyPath}`)
  console.warn(` - Cert: ${certPath}`)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: httpsConfig,
  },
})
