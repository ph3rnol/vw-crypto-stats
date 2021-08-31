require('dotenv').config()

const _isString = require('lodash/isString')

const getConfig = require('./lib/util/get_config')
const getLogger = require('./lib/util/get_logger')
const run = require('./lib')

const debug = getLogger('svc')
const config = getConfig()

debug('VW Crypto Monitor starting...')

run(config).then(() => {
  debug('VW Crypto Monitor running...')

  return config
}).catch((error) => {
  const msg = _isString(error.stack) ? error.stack : error.message

  debug('error: %s', msg)

  throw error
})
