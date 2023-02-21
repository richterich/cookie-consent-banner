/** @type {import('vite').UserConfig} */
const config = {
  server: {
    port: 8080,
    host: 'dev.local',
    https: {
      key: '.cert.local/key.pem',
      cert: '.cert.local/cert.pem'
    }
  }
}

export default config
