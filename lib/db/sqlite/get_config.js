const _baseMergeDeep = require('lodash/_baseMergeDeep')
const DEFAULT_SQL_CONFIG = require('./default_config')

/**
 * TODO: doc
 */
const getSQLConfig = (sqlConfig = {}) => (
  _baseMergeDeep({}, DEFAULT_SQL_CONFIG, sqlConfig)
)

module.exports = getSQLConfig
