const express = require('express')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 5000

// uses
app.use(morgan('combined'))

// methods
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`)
})