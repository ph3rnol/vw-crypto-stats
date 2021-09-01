const openBFXConnection = require('./exchanges/bitfinex')

const run = async (config = {}) => {
  const config = genConfig

  await openBFXConnection(config)
}

module.exports = run
