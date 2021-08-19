const morgan = require('morgan')

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
}
  
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.error(...params)
  }
}

const setMorgan = (app) => {
  //app = express()
  morgan.token('custom', function (req) { return JSON.stringify(req.body) })
  app.use(morgan(':method :url :status, :custom'))
}
  
module.exports = {
  info, error, setMorgan
}