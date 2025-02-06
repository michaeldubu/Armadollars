import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import { authMiddleware } from '@/middleware/auth'
import { rateLimitMiddleware } from '@/lib/rateLimit'
import { validateInput, awardSchema } from '@/lib/validation'
import { handleError } from '@/lib/errorHandler'
import logger from '@/lib/logger'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await (await connectToDatabase()).client.startSession()

  try {
    await rateLimitMiddleware(req, res)
    const { employeeId, amount, reason } = validateInput(awardSchema, req.body)
    const managerId = req.userId

    await session.withTransaction(async () => {
      const { db } = await connectToDatabase()

      const award = await db.collection('armadollarAwards').insertOne({
        employeeId,
        managerId,
        amount,
        reason,
        createdAt: new Date()
      }, { session })

      await db.collection('users').updateOne(
        {   _id: employeeId },
        { $inc: { armadollarBalance: amount } },
        { session }
      )

      logger.info(`Armadollars awarded: ${amount} to employee ${employeeId} by manager ${managerId}`)
    })

    res.status(200).json({ message: 'Armadollars awarded successfully' })
  } catch (error) {
    handleError(error, res)
  } finally {
    await session.endSession()
  }
}

export default authMiddleware(handler)
