module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    ...defaultConfig,
    env: {
      AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    },
  }
  return nextConfig
}
