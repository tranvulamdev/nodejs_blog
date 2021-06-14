const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    // [GET] /
    index(req, res, next) {
        // use Promise
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                })
            })
            .catch(next)
        // catch nhận 1 function và trả về err, so...
    }

    // GET /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController()
