const mongoose = require('mongoose')
mongoose.set('debug', true)
const Question = require('./Questions')

const questionBankSchema = new mongoose.Schema(
    {
        questions: 
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Question
        }],
        reusedQuestions: 
        [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: Question
        }],
        teacherID: {
            type: String,
            required: true,
            validate: 
            {
                validator: function(value) {return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)},
                message: 'Invalid TeacherId'
            }
        },
        title: {
            type: String,
            required: true
        },
        modified: {
            type: Date
        }
})

questionBankSchema.pre('findOneAndUpdate', function(next) {
    this._update.modified = Date.now()
    next()
  })

const QuestionBank = mongoose.model('question_bank', questionBankSchema)

module.exports = QuestionBank

