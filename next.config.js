/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
    async rewrites() {
      return [
          {
              source: '/api/:slug*',
              destination: 'https://dev-api.discalbot.com/:slug*'
          }
      ]
    }
}
