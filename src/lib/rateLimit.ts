import rateLimit from 'express-rate-limit'
import { NextApiRequest, NextApiResponse } from 'next'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

export function rateLimitMiddleware(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    limiter(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}
