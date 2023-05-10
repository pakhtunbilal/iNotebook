// Requirements

const Connection = require("./connectionDB")
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
Connection()

// Available Routes

app.use('/auth', require('./routes/auth') )
app.use('/notes', require('./routes/notes') )


// Running Port

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
