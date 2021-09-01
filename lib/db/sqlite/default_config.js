const os = require('os')
const path = require('path')
const sqlite3 = require('sqlite3')

// TODO: Create directory if needed
// TODO: Resolve usable config directory in user home
const DEFAULT_CONFIG = {
  DEFAULT_FN: 'vwt_db.sqlite',
  DEFAULT_PATH: path.join(os.homedir(), 'vwt_db.sqlite'),
  DEFAULT_DRIVER: sqlite3.cached.Database
}

module.exports = DEFAULT_CONFIG
