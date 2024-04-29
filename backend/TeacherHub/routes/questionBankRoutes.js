const express = require('express')
const router = express.Router()
const controller = require('../controllers/questionBankController')

router.put('/update-order/:assessmentId', controller.updateOrder)
router.get('/all-topics', controller.getTopics)

router.post('/add-question/:assessmentId', controller.addQuestionToBank)
router.put('/update-question/:assessmentId/:questionId', controller.updateQuestionInBank)
router.delete('/delete-question/:assessmentId/:questionId', controller.removeQuestionFromBank)

router.post('/add-reused-questions/:assessmentId', controller.addReusedQuestionsToBank)
router.put('/update-reused-question/:assessmentId/:questionId', controller.updateReusedQuestionInBank)
router.delete('/delete-reused-question/:assessmentId/:questionId', controller.removeReusedQuestionFromBank)

router.get('/all-banks', controller.getAllBanks)
router.get('/questions/:assessmentId', controller.getBankQuestions)
router.get('/all-questions', controller.getAllQuestions)

module.exports = router