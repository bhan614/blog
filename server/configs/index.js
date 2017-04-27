import privateConfig from './private.js';
let config = {
  app: {
    port: process.env.PORT || 8888,
    baseApi: '/api',
    authApi: '/auth',
  },
  mongodb: {
    url: 'mongodb://localhost:27017/vue-blog',
    opts: {
      user: '',
      pass: ''
    }
  }
}
config = Object.assign(config, privateConfig)
module.exports = config;
