import { authMiddleware } from '@/middleware/auth'

export const createContext = ({ req }) => {
  const user = authMiddleware(req)
  return { userId: user?.id }
}
