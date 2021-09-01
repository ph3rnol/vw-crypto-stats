const { promises: fs } = require('fs')
const _forEach = require('lodash/forEach')

/**
 * Object with both a file handle and a stat result. Saves time (await)
 *
 * @typedef FileExistenceCheckRes
 * @type Object
 * @member {Stat} stat - from check
 * @member {object} file - file handle
 */

const FS_NODE_TYPES = ['FILE', 'DIRECTORY', 'LINK', 'FIFO']

// TODO: Extract
// TODO: Refactor w/ better lodash func
const genEnum = values => {
  const dict = {}

  _forEach(values, k => dict[k] = k)

  return dict
}


/**
 * Throws if the provided path is not a file, otherwise returns the file handle
 *
 * @async
 * @throws Error if no file is found at the path
 *
 * @param {string} fnPath - path to file
 * @param {string?} fileType - a value from the FSNodeType enum
 * @returns {Promise} p - resolves to a FileExistenceCheckRes object
 */
const fsNodeExists = async (fnPath, fnType) => {
  const s = await fs.stat(fnPath)

  if (s && (s.isFile() || (allowDirectory || s.isDirectory()))) {
    return s
  }

  throw new Error(`No file or directory exists at path: ${filePath}`)
}

module.exports = fileExists
