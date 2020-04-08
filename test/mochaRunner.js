const Mocha = require('mocha')
const path = require('path')

const mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: './docs/nodeTest',
  }
})

mocha.addFile(path.join(__dirname, './service/router.spec.js'))
mocha.run(function () {
  process.exit()
})
