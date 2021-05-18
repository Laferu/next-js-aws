import { NextApiRequest, NextApiResponse } from 'next'
import { Swipe, NewLoginSession } from '@swp/swipe-sdk'

import sdk from '@/serverSideFunctions/sdk'
import { loginSession } from '@/serverSideFunctions/loginSession'


export const verifyPass = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await loginSession(sdk, req)

    const login: NewLoginSession = {
      login: result.login,
      password: req.body.password,
      expirationInDays: 1
    }

    const { data } = await sdk.Login.newSession(login)

    res.json({ data })
  } catch (error) {
    res.json({ data: error })
  }
}

export default verifyPass
