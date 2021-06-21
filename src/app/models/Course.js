const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, require: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String, require: true },
        level: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
)

// plugin slug
mongoose.plugin(slug)

// plugin auto tăng giá trị id (vấn đề căng khi nhiều user click vào cùng 1 button (vd: thêm course) cùng 1 thời điểm)
Course.plugin(AutoIncrement)

// plugin dành cho các thao tác delete,... và override all thao tác
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Course', Course)
