import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    armadollarBalance: Int!
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User!]!
  }

  type Mutation {
    awardArmadollars(employeeId: ID!, amount: Int!, reason: String!): Boolean!
  }
`
