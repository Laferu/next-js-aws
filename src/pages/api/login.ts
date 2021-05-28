import { NextApiRequest, NextApiResponse } from "next";
import { Swipe, NewLoginSession } from '@swp/swipe-sdk'

const sdk = new Swipe({
  apiKey: process.env.REACT_APP_SDK_API_KEY,
  secret: process.env.REACT_APP_SDK_SECRET,
  customHost: process.env.REACT_APP_SDK_BASE_URL,
  debug: true
})

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  const login: NewLoginSession = {
    login: req.body.login,
    password: req.body.password,
    expirationInDays: req.body.expirationInDays
  }

  try {
    const { data } = await sdk.Login.newSession(login)
    console.log(data)

    res.json({ data })
  } catch (error) {
    res.json({ data: error })
  }

  // res.json({ data: req.body })
}

export default Login
