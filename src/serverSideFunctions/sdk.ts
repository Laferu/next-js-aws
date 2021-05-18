import { Swipe } from '@swp/swipe-sdk'

const sdk = new Swipe({
  apiKey: process.env.REACT_APP_SDK_API_KEY,
  secret: process.env.REACT_APP_SDK_SECRET,
  customHost: process.env.REACT_APP_SDK_BASE_URL,
  debug: true
})

export default sdk
