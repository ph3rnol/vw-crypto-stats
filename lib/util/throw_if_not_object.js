const _isEmpty = require('lodash/isEmpty')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')

const DEFAULT_LABEL = 'var expected but not'

/**
 * Throws a labelled error if the provided var is not an object.
 *
 * @async
 *
 * @param {number|string|object|function?} var - variable to validate
 * @param {string?} name - optional var name to provide within error string
 * @returns {Promise} p
 */
const throwIfNotObject = async (var, name = '') => {
  if (!_isString(name)) {
    throw new Error(`Error name provided but not string: type ${typeof name}`)
  }

  const label = !_isEmpty(name) ? name : DEFAULT_LABEL

  if (!_isObject(var)) {
    throw new Error(`${label} not object: type ${typeof var}`)
  }
}

module.exports = throwIfNotObject
