require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const mysql = require('./config/db')
const routes = require('./routes/index')

const app = express()

//connection Mysql
mysql.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack)
  } else {
    console.log('connecterd to database with threadId : ' + mysql.threadId)
  }
})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extented: true }))

app.use('/perso', routes.perso)

app.listen(process.env.PORT, console.log('http://localhost:4242'))
