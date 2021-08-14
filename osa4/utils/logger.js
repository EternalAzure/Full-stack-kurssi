const morgan = require('morgan')


const info = (...params) => {
  console.log(...params)
}
  
const error = (...params) => {
  console.error(...params)
}

const setMorgan = (app) => {
  //app = express()
  morgan.token('custom', function (req) { return JSON.stringify(req.body) })
  app.use(morgan(':method :url :status, :custom'))
}
  
module.exports = {
  info, error, setMorgan
}