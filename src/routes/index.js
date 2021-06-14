const newsRouter = require('./news')
const coursesRouter = require('./courses')
const siteRouter = require('./site')
const meRouter = require('./me')

function route(app) {
    app.use('/news', newsRouter)
    app.use('/me', meRouter)
    app.use('/courses', coursesRouter)
    app.use('/', siteRouter)

    // submit form với post thì query không hiện trên url
    // get: => req.query, post: => req.body (form data)
}

module.exports = route
