// module.exports = async (phase, { defaultConfig }) => {
//   /**
//    * @type {import('next').NextConfig}
//    */
//   const nextConfig = {
//     ...defaultConfig,
//     env: {
//       AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
//       VERCEL_URL:
//         `https://${process.env.VERCEL_URL}` || 'http://localhost:3000',
//     },
//   }
//   return nextConfig
// }

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
        AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
        VERCEL_URL:
          `https://${process.env.VERCEL_URL}` || 'http://localhost:3000',
      }
  }

module.exports = nextConfig