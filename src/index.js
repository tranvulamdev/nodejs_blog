const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const methodOverride = require('method-override')

// my SortMiddleware
const SortMiddleware = require('./app/middleware/SortMiddleware')

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
        helpers: {
            sum: (a, b) => a + b,
            sortTable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `<a href="me/stored/courses?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`
            },
        },
        // các function hổ trợ làm việc (phép toán) với file hbs, trong file không quy định làm dc
    }),
)

// HTTP logger hiện chi tiết các request trong terminal
app.use(morgan('combined'))

//middleware 2 cái dưới hỗ trợ ghi dữ liệu submit form data query => lưu vào req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// __dirname gần là path của index.js và tùy biến từ từ (hình như __dirname cũng ảnh hưởng đến nhúng file css trong main.hbs)?
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views')) //layoutsDir

// middleware methodOverride dùng cho form (html) cập nhật course chỉ support method get/post nên dùng nó để có thể dùng các method khác
app.use(methodOverride('_method'))

// Custom middlewares (middleware tự tạo ra)
app.use(SortMiddleware)

// routes initial
route(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
