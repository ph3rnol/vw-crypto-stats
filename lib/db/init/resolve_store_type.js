const { promises: fs } = require('fs')
const Bluebird = require('bluebird')
const _isString = require('lodash/isString')
const _isNull = require('lodash/isNull')
const _isEmpty = require('lodash/isEmpty')
const _values = require('lodash/values')
const _includes = require('lodash/includes')
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

  throw new Error(`No file or directory exists at path: ${filePath}`)
}

const isValidMode = async mode => _includes(VALID_STORE_MODES, mode)

// WIP
const -. = async (type, mode, createPermissions = DEFAULT_STORE_PERM) => {
}

// TODO: Add logging and break up/extract funcs
const resolveStoreType = async (args = {}) => {
  const {
    type = DEFAULT_STORE_TYPE,
    mode = DEFAULT_STORE_MODE
  } = args

  if (type !== RAM_STORE_ID) {
    await throwIfFileIncompatible({ fn: type, mode })
  } else if (!_includes(_values)) {
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
}
