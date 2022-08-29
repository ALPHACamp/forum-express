const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const passport = require('./config/passport')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))
// app.use('/upload', express.static(__dirname + '/upload'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

require('./routes')(app)
