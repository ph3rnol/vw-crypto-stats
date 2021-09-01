const onCandle = async () => {
  debug('%s', candles.map(c => c.toString()).join(', '))
}

module.exports = onCandle
