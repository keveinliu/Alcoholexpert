const fs = require('fs');
const path = require('path');

// 读取config.json文件
const configPath = path.join(__dirname, 'config.json');
const configJson = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// 使用环境变量覆盖配置
const config = {
  db: {
    user: process.env.DB_USER || configJson.db.user,
    host: process.env.DB_HOST || configJson.db.host,
    database: process.env.DB_NAME || configJson.db.database,
    password: process.env.DB_PASSWORD || configJson.db.password,
    port: parseInt(process.env.DB_PORT || configJson.db.port, 10),
  },
  listen: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 4000
  }
};

module.exports = config;
