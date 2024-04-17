const express = require('express')
const router = express.Router()
const controller = require('../controllers/gradingController')

router.get('/summary/:assessmentId', controller.getQuestionSummary)
router.get('/responses/:questionId', controller.getQuestionResponses)
router.put('/grade-response/:submissionId/:responseId', controller.gradeResponse)

module.exports = router