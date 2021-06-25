import { NextApiRequest, NextApiResponse } from "next"
import { SearchOptions } from '@swp/swipe-sdk'
import sdk from '@/serverSideFunctions/sdk'

const users = async (req: NextApiRequest, res: NextApiResponse) => {
  const limit = Number(req.query.limit)
  const starting_after = Number(req.query.starting_after)
  const queryParams = req.query.queryParams ? JSON.parse((req.query.queryParams).toString()) : {}

  const searchOptions: SearchOptions = {
    pagination: {
      limit: limit,
      starting_after: starting_after
    },
    queryParams
  }

  try {
    const { data: { data: originalData, pagination } } = await sdk.Profile.getUsers(searchOptions)

    const newArray = originalData.data.map(e => {
      const amount = e.balances
        ? e.balances.reduce((acc, crr) => acc + Number(crr.amount), 0)
        : 0
      return { ...e, amount }
    })

    res.json({ data: newArray, pagination })
  } catch (error) {
    res.json({ data: error })
  }
}

export default users
