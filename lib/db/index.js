const os = require('os')
const path = require('path')
const { open: openSQLiteDB } = require('sqlite')

const sqlite3 = require('./sqlite3')
const onDBTrace = require('./on_trace')

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

m dule.exports = open
