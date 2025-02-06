import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import { authMiddleware } from '@/middleware/auth'
import { rateLimitMiddleware } from '@/lib/rateLimit'
import { handleError } from '@/lib/errorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await rateLimitMiddleware(req, res)
    const { db } = await connectToDatabase()

    const totalUsers = await db.collection('users').countDocuments()
    const totalArmadollars = await db.collection('users').aggregate([
      { $group: { _id: null, total: { $sum: "$armadollarBalance" } } }
    ]).toArray()

    const recentAwards = await db.collection('armadollarAwards')
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray()

    res.status(200).json({
      totalUsers,
      totalArmadollars: totalArmadollars[0]?.total || 0,
      recentAwards,
    })
  } catch (error) {
    handleError(error, res)
  }
}

export default authMiddleware(handler)
