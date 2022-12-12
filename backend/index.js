require('dotenv').config()
require('./src/config')
require('./src/database')
require('./src/helper')
const express = require('express')
const app = express()
const cors = require('cors')

// set express static path
app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

const PORT = AppConfig.PORT

// cors options
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// import route
app.use(require('./src/packages/certificate/route').Router)


// default error middleware -> You should remove this when debugging
app.use((err, req, res, next) => {
    console.log(err)
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status: err.status,
        error: err.message
    })
})

app.listen(PORT, () => {
    console.log(`App Launched 🚀 & listening on port ${PORT}`)
})