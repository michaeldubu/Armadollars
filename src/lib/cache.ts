import NodeCache from 'node-cache'
import { Redis } from 'ioredis'

const localCache = new NodeCache({ stdTTL: 600 })
const redisClient = new Redis(process.env.REDIS_URL)

export async function getFromCache<T>(key: string): Promise<T | undefined> {
  const localValue = localCache.get<T>(key)
  if (localValue !== undefined) {
    return localValue
  }

  const redisValue = await redisClient.get(key)
  if (redisValue) {
    const parsedValue = JSON.parse(redisValue)
    localCache.set(key, parsedValue)
    return parsedValue
  }

  return undefined
}

export async function setInCache<T>(key: string, value: T, ttl?: number): Promise<void> {
  localCache.set(key, value, ttl)
  await redisClient.set(key, JSON.stringify(value), 'EX', ttl || 600)
}
