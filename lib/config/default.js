const genBFXAPIConfig = require('../exchanges/bitfinex/config')

/**
 * Default application config
 *
 * @see BFXAPIConfig
 * @typedef Config
 *
 * @property {BFXAPIConfig?} bfxAPIConfig - Bitfinex API connection config
 */

const getDefaultConfig = (config = {}) => {
  const { userBFXAPIConfig = {}, ...userConfig } = config

  return {
    bfxAPIConfig: genConfig({...userConfig, ...genBFXAPIConfig(userBFXAPIConfig)})
  }
}

module.exports = DEFAULT_CONFIG
