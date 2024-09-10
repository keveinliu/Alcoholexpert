const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const config = require('./config');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('./db'); // 假设您有一个数据库模块

const app = express();

// 提供静态文件服务
app.use(express.static('public'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { db };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(config.listen.port, config.listen.host, () => {
    console.log(`🚀 服务器运行在 http://${config.listen.host}:${config.listen.port}`);
    console.log(`🚀 GraphQL路径为 ${server.graphqlPath}`);
  });
}

startServer();
