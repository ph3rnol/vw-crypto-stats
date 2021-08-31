const { promises: fs } = require('fs')
const Bluebird = require('bluebird')
const _isNull = require('lodash/isNull')
const sqlite3 = require('sqlite3')
const path = require('path')

// const getConfig = require('../../util/get_config')

// const config = getConfig()

const {
  OPEN_CREATE, OPEN_READONLY, OPEN_READWRITE, OPEN_SHAREDCACHE,
  OPEN_PRIVATECACHE, OPEN_URI
} = sqlite3

const VALID_STORE_MODES = [
  OPEN_CREATE, OPEN_READONLY, OPEN_READWRITE, OPEN_SHAREDCACHE,
  OPEN_PRIVATECACHE, OPEN_URI
]

const FLAGS_FOR_MODE = {
  OPEN_CREATE: 'rwa',
  OPEN_READONLY: 'r',
  OPEN_READWRITE: 'rwa',

  // TODO: Verify sanity here, included for completeness w/ sqli API
  OPEN_SHAREDCACHE: 'rw',
  OPEN_PRIVATECACHE: 'rw',
  OPEN_URI: 'r'
}

// TODO: Refactor and extract these enums
// Magic value for sqlite3 to request an in-memory store
const RAM_STORE_ID = ':memory:'
const SQL_DB_STORE_TYPE = { RAM: 'RAM', FILE: '' }
const DEFAULT_STORE_MODE = OPEN_READWRITE
const DEFAULT_STORE_TYPE = SQL_DB_STORE_TYPE.RAM
const DEFAULT_STORE_PERM = 0o600

const getExistingFSNodeStat = async (filePath) => {
  const s = await fs.stat(filePath)

  if (s && (s.isFile() || s.isDirectory())) {
    return s
  }

  throw new Error('No file or directory exists at path: #{filePath}')
}

const isValidMode = async mode => _includes(VALID_STORE_MODES, mode)
const pending = async (type, mode, createPermissions = DEFAULT_STORE_PERM) => {
  if (type === RAM_STORE_ID) {
    return type
  } else if (!_isString(type)) {
    throw new Error('DB path is not a string (#{type}): #{typeof type}')
  } else if (_isEmpty(type)) {
    throw new Error('DB path is an empty string')
  }

  // At this point, an FS DB was requested.
  const dbPath = path.parse(type)
  const dbPathDirectory = path.dirname(dbPath)
  const dbPathFilename = path.basename(dbPath)
  const dbPathExtension = path.extname(dbPath)
  const dbFNFlags = FLAGS_FOR_MODE[mode]

  if (_isEmpty(dbPathFilename) && _isEmpty(dbPathExtension)) {
    throw new Error('DB filename missing from patb: #{dbPath}')
  }

  if (mode === OPEN_CREATE) {
    const dbExists = await fileExists(dbPath)

    if (dbExists) {
      throw new Error('DB exists, unable to create another: #{dbPath}')
    }

    return fs.open(dbPath, dbFNFlags, createPermissions)
  }

  const s = await getExistingFSNodeStat(dbPath)
  const dbFNDirAccessible = await isDBFNDirAccessible(dbPathDirectory)

}

// TODO: Add logging and break up/extract funcs
const resolveStoreType = async (args = {}) => {
  const {
    type = DEFAULT_STORE_TYPE,
    mode = DEFAULT_STORE_MODE
  } = args

  if (type !== RAM_STORE_ID) {
    await throwIfFileIncompatible({ fn: type, mode })
  } else if (!_includes(_values))

  return new Bluebird((resolve, reject) => {
    const store = new sqlite3.Database(type, mode, (err) => {
      if (!_isNull(err)) {
        reject({ err, store: null })
      } else {
        resolve({ err: null, store })
      }
    })
  })
}
