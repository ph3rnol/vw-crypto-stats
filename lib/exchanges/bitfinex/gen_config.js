const genConfig = require('../../util/gen_config')

// TODO: Doc
const DEFAULT_BFX_CONFIG = {
  transform: true,
  manageCandles: true
}

const genBitfinexConfig = async (config = {}) => (
  genConfig(DEFAULT_BFX_CONFIG, config)
)

module.exports = genBitfinexConfig
