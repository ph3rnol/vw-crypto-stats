const BitfinexAPI = require('bitfinex-api-node')
const onOpen = require('./on_open')

const openBitfinexConnection = async (args = {}) => {
  const BFX = new BitfinexAPI({
    ...args,

    transform: true,
    manageCandles: true
  })

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
