const getLogger = require('../../util/get_logger')
const debug = getLogger('ex:bfx:on_open')

// TODO: Expand
// TODO: Extract onError
const onOpen = ({ ws }) => async () => {
  ws.on('error', e => debug('WSv2 error: %s', e.message | e))

  await ws.subscribeCandles('trade:1m:tBTCUSD')

  ws.onCandle({ key: 'trade:1m:tBTCUSD' }, (candles) => {
    debug('%s', JSON.stringify(candles))
  })
}

module.exports = onOpen
