const {
  API_TOKEN = '',
  API_SECRET = '',
  COMPANY = ''
} = process.env

const config = {
  apiToken: API_TOKEN,
  apiSecret: API_SECRET,
  company: COMPANY
}

const getConfig = () => ({ ...config })

module.exports = getConfig
