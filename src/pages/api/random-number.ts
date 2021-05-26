import { NextApiRequest, NextApiResponse } from "next";
import sdk from '@/serverSideFunctions/sdk'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await sdk.CashIn
      .getBoleto('d4268484e8b3ffcd246b922678a8ab1072c1f6e0facf71b4cea54d0c789cdded')

    res.json(data)
  } catch (error) {
    res.json({ data: error })
  }
}
