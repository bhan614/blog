import privateConfig from './private.js';
let config = {
  app: {
    port: process.env.PORT || 8888,
    baseApi: '/api',
  },
  mongodb: {
    url: 'mongodb://localhost/vue-blog',
    opts: {
      user: '',
      pass: ''
    }
  }
}
config = Object.assign(config, privateConfig)
module.exports = config;
