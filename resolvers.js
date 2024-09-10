const bcrypt = require('bcryptjs');

// 使用内存存储用户信息(仅用于演示,不要在生产环境使用)
const users = [];

const resolvers = {
  Mutation: {
    registerUser: async (_, { username, password, email }) => {
      // 检查用户名是否已存在
      if (users.find(user => user.username === username)) {
        throw new Error('用户名已存在');
      }

      // 检查邮箱是否已被使用
      if (users.find(user => user.email === email)) {
        throw new Error('邮箱已被使用');
      }

      // 加密密码
      const hashedPassword = await bcrypt.hash(password, 10);

      // 创建新用户
      const newUser = {
        id: String(users.length + 1),
        username,
        password: hashedPassword,
        email
      };

      users.push(newUser);

      return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      };
    },
    login: async (_, { username, password }) => {
      const user = users.find(u => u.username === username);
      if (!user) {
        throw new Error('用户不存在');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('密码错误');
      }

      // 这里应该生成一个token,但为了简化,我们直接返回用户信息
      return {
        id: user.id,
        username: user.username,
        email: user.email
      };
    }
  },
  Query: {
    // 可以添加一些查询,例如获取用户信息
    getUser: (_, { id }) => {
      const user = users.find(u => u.id === id);
      if (!user) {
        throw new Error('用户不存在');
      }
      return {
        id: user.id,
        username: user.username,
        email: user.email
      };
    }
  }
};

module.exports = resolvers;
