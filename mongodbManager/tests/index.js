const Mocha = require('mocha')
const path = require('path')

const mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: path.join(__dirname, '../docs/tests'),
  }
})

mocha.addFile(path.join(__dirname, './position.spec.js'))

mocha.run(process.exit.bind(process))
