const BitfinexAPI = require('bitfinex-api-node')

const genBitfinexConfig = require('./gen_config')
const onOpen = require('./on_open')

// TODO: Refactor, doc
const openBitfinexConnection = async (userConfig = {}) => {
  const config = await genBitfinexConfig(userConfig)
  const BFX = new BitfinexAPI(config)

  const ws = BFX.ws()
  const rest = BFX.rest()
  const bfxAPIClients = { ws, rest }

  // const symbols = await rest.symbols()
  // debug('%s', JSON.stringify(symbols))

  ws.on('open', onOpen(bfxAPIClients))

  await ws.open()

  return bfxAPIClients
}

module.exports = openBitfinexConnection
