const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

const route = require('./routes')

// template engine
app.engine(
    'hbs',
    handlebars({
        // đổi đuôi file handlebars thành hbs
        extname: '.hbs',
    }),
)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views')) //layoutsDir

// __dirname gần là path của index.js và tùy biến từ từ (hình như __dirname cũng ảnh hưởng đến nhúng file css trong main.hbs)
app.use(express.static(path.join(__dirname, 'public')))

//middleware 2 cái dưới hỗ trợ ghi dữ liệu form data query
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// HTTP logger hiện chi tiết các request trong terminal
app.use(morgan('combined'))

// routes initial
route(app)

app.listen(port, () => {
    console.log(`My app listening at http://localhost:${port}`)
})
