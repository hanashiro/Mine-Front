exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['specs/*.js'],

  baseUrl: 'http://localhost:9000/',

  framework: 'jasmine',

  params: {
    login: {
      user: 'mine',
      password: '1234'
    }
  },
}