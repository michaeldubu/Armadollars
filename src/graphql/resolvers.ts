import { connectToDatabase } from '@/lib/mongodb'

export const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      const { db } = await connectToDatabase()
      return db.collection('users').findOne({ _id: id })
    },
    getAllUsers: async () => {
      const { db } = await connectToDatabase()
      return db.collection('users').find().toArray()
    },
  },
  Mutation: {
    awardArmadollars: async (_, { employeeId, amount, reason }, { userId }) => {
      const { db } = await connectToDatabase()
      const session = await db.client.startSession()

      try {
        await session.withTransaction(async () => {
          await db.collection('armadollarAwards').insertOne({
            employeeId,
            managerId: userId,
            amount,
            reason,
            createdAt: new Date()
          }, { session })

          await db.collection('users').updateOne(
            { _id: employeeId },
            { $inc: { armadollarBalance: amount } },
            { session }
          )
        })

        return true
      } catch (error) {
        console.error('Error awarding Armadollars:', error)
        return false
      } finally {
        await session.endSession()
      }
    },
  },
}
