import { NextApiRequest, NextApiResponse } from "next";
import { Swipe, SearchOptions } from '@swp/swipe-sdk'

const sdk = new Swipe({
  apiKey: process.env.REACT_APP_SDK_API_KEY,
  secret: process.env.REACT_APP_SDK_SECRET,
  customHost: process.env.REACT_APP_SDK_BASE_URL,
  debug: true
})

const allBoletos = async (req: NextApiRequest, res: NextApiResponse) => {
  // const id = req.body.id

  try {
    const { data: { data } } = await sdk.CashOut.getAllBoletos({})

    res.json(data)
  } catch (error) {
    res.json({ data: error })
  }

  // res.json({ data: req.body })
}

export default allBoletos
