const getLogger = require('../util/get_logger')
const l = getLogger('db:trace')

const onTrace = (trace) => {
  l.error('SQLite DB Error: %s', trace)
}

module.exports = onTrace
