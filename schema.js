const { gql } = require('apollo-server');

const typeDefs = gql`
  type Wine {
    id: ID!
    photo: String!
    rating: Float!
    comment: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    # 保留现有的wine相关query
    wines: [Wine!]!
    wine(id: ID!): Wine

    # 添加用户相关query
    getUser(id: ID!): User
  }

  type Mutation {
    # 保留现有的wine相关mutation
    addWine(photo: String!, rating: Float!, comment: String): Wine!
    updateWine(id: ID!, photo: String, rating: Float, comment: String): Wine!
    deleteWine(id: ID!): Boolean!

    # 添加用户相关mutation
    registerUser(username: String!, password: String!, email: String!): User
    login(username: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
