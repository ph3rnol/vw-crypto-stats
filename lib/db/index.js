const os = require('os')
const path = require('path')
const { open: openSQLiteDB } = require('sqlite')
const sqlite3 = require('sqlite3')

sqlite3.verbose()

const onDBTrace = require('./on_trace')
const getConfig = require('../util/get_config')

// TODO: Create directory if needed
// TODO: Resolve usable config directory in user home
const DEFAULT_SQL_PATH = path.join(os.homedir(), 'vwt_db.sqlite')
const DEFAULT_SQL_DRIVER = sqlite3.cached.Database

// TODO: Extract config into env
const open = async (opts = {}) => {
  const config = getConfig()
  const {
    sqlDBPath = DEFAULT_SQL_PATH,
    sqlDBDriver = DEFAULT_SQL_DRIVER
  } = config

  const {
    filename = sqlDBPath,
    driver = sqlDBDriver
  } = opts

  const db = await openSQLiteDB({ filename, driver })

  db.on('trace', onDBTrace)

  return db
}

module.exports = open
