module.exports = {
  env: {
    REACT_APP_HOST: process.env.REACT_APP_HOST,
    REACT_APP_SDK_API_KEY: process.env.REACT_APP_SDK_API_KEY,
    REACT_APP_SDK_SECRET: process.env.REACT_APP_SDK_SECRET,
    REACT_APP_SDK_BASE_URL: process.env.REACT_APP_SDK_BASE_URL,
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
