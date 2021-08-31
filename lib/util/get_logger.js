const debug = require('debug')

const getLogger = (namespace, ...args) => (
  debug('vw-crypto-monitor:#{namespace}', ...args)
)

module.exports = getLogger
