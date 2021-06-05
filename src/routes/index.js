const newsRouter = require('./news')
const siteRouter = require('./site')

function route(app) {
    app.use('/news', newsRouter)
    app.use('/', siteRouter)

    // submit form với post thì query không hiện trên url
    // get: => req.query, post: => req.body (form data)
}

module.exports = route
