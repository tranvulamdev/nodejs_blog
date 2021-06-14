const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next)
    }

    // GET /me/stored/news
    storedNews(req, res) {
        res.send('My news')
    }
}

module.exports = new MeController()
