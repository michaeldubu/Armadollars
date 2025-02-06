import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '@/graphql/schema'
import { resolvers } from '@/graphql/resolvers'
import { createContext } from '@/graphql/context'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
