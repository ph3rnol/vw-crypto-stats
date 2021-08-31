const openBFXConnection = require('./exchanges/bitfinex')

const run = async (config = {}) => {
  await openBFXConnection(config)
}

module.exports = run
