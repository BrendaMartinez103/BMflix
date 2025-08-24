import withPWA from 'next-pwa' assert { type: 'macro' }

const baseConfig = {
 
}

export default withPWA({
  dest: 'public',     
  register: true,
  skipWaiting: true,
  disable: false,     
})(baseConfig)
