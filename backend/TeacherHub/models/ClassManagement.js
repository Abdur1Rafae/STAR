const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema(
{
    name: { type: String, required: true },
    erp: { type: Number, required: true },
    email: { type: String, required: true }
})

const sectionSchema = new Schema(
{
    sectionName: { type: String, required: true, trim: true },
    roster: [studentSchema] 
})

const classSchema = new Schema({
    className: { type: String, required: true, trim: true},
    teacherID: { type: String, required: true },
    sections: [sectionSchema] 
})

const Class = mongoose.model('Class', classSchema)

module.exports = Class
