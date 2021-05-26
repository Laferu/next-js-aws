module.exports = {
  env: {
    REACT_APP_HOST: process.env.REACT_APP_HOST
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}
