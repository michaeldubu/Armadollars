import { NextApiResponse } from 'next'
import logger from './logger'

export function handleError(error: unknown, res: NextApiResponse) {
  logger.error('Server error:', error)
  
  if (error instanceof Error) {
    return res.status(500).json({ message: 'An unexpected error occurred', error: error.message })
  }
  
  return res.status(500).json({ message: 'An unexpected error occurred' })
}
