const config = {
  app: {
    port: process.env.PORT || 3030,
    baseApi: '/api',
  },
  mongodb: {
    url: 'mongodb://localhost:27017/vue-blog',
    opts: {
      user: '',
      pass: ''
    }
  }
}
module.exports = config;
