const throwIfNotObject = require('./throw_if_not_object')

/**
 * Throws a labelled error if the provided var is not an object.
 *
 * @async
 * @see DefaultConfig
 * @throws Error if either parameter is supplied and not an object
 *
 * @param {object?} [defaultConfig={}] - default config
 * @param {object?} [config={}] - config to apply over defaults
 * @returns {Promise} p
 */
const genConfig = async (defaultConfig = {}, userConfig = {}) => {
  await throwIfNotObject(defaultConfig, 'default config')
  await throwIfNotObject(config, 'user config')

  return { ...defaultConfig, ...config }
}

module.exports = genConfig
