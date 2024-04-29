const express = require('express')
const router = express.Router()
const controller = require('../controllers/teacherController')

router.get('/reports', controller.getAllReports)
router.get('/overview/:assessmentId', controller.getReportOverview)
router.get('/question-summary/:assessmentId', controller.getQuestionSummary)
router.get('/individual-response/:responseId', controller.getIndividualResponse)


module.exports = router