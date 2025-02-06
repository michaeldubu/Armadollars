import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import { authMiddleware } from '@/middleware/auth'
import { getFromCache, setInCache } from '@/lib/cache'
import { handleError } from '@/lib/errorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const userId = req.query.userId as string
    const cacheKey = `user_balance_${userId}`
    
    let balance = await getFromCache<number>(cacheKey)
    
    if (balance === undefined) {
      const { db } = await connectToDatabase()
      const user = await db.collection('users').findOne({ _id: userId })
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      
      balance = user.armadollarBalance || 0
      await setInCache(cacheKey, balance, 300) // Cache for 5 minutes
    }

    res.status(200).json({ balance })
  } catch (error) {
    handleError(error, res)
  }
}

export default authMiddleware(handler)
