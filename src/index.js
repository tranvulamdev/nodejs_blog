const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

const route = require('./routes')

// db
const db = require('./config/db')

// Connect to DB
db.connect()

// template engine
app.engine(
    'hbs',
    handlebars({
        // đổi đuôi file handlebars thành hbs
        extname: '.hbs',
        helpers: { sum: (a, b) => a + b },
    }),
)

// HTTP logger hiện chi tiết các request trong terminal
app.use(morgan('combined'))

//middleware 2 cái dưới hỗ trợ ghi dữ liệu form data query
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// __dirname gần là path của index.js và tùy biến từ từ (hình như __dirname cũng ảnh hưởng đến nhúng file css trong main.hbs)?
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views')) //layoutsDir

// routes initial
route(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
