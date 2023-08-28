/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    async rewrites(){
      return{
        afterFiles: [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
          },
        ],
      }
    },
  }
  
  module.exports = nextConfig
  