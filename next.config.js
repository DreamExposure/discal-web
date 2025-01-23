/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
    async rewrites() {
      return [
          {
              source: '/api/:slug*',
              destination: 'https://dev.discalbot.com/api/:slug*'
          },
      ]
    },
    images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: "images.unsplash.com",
              port: '',
              search: ''
          },
      ],
    },
}
