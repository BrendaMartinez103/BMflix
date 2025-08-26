import withPWA from 'next-pwa' assert { type: 'macro' }

const isDev = process.env.NODE_ENV === 'development'

const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev, 
})(baseConfig)
