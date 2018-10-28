module.exports = {
  apps : [
    {
    name: 'logger',
    script: 'logger.js',
    instances: 1,
    autorestart: false,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      LINES:3,
      FILEPATH:'./logs/server.log',
      PORT:4002
    }
  },
  {
    name: 'app',
    script: 'app.js',
    instances: 1,
    autorestart: false,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      LOGFOLDER:'./logs',
      FILENAME:'server.log',
      PORT:4003
    }
  }]
};
