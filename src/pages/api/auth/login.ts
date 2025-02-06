import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/lib/mongodb'
import { validateInput, loginSchema } from '@/lib/validation'
import { handleError } from '@/lib/errorHandler'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, password } = validateInput(loginSchema, req.body)
    const { db } = await connectToDatabase()
    
    const user = await db.collection('users').findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' })
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (error) {
    handleError(error, res)
  }
}
