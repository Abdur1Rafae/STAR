import {create} from 'zustand';
import { SubmitAssessment } from '../APIS/Student/AssessmentAPI';
import { FlagStudents } from '../APIS/Student/AssessmentAPI';
import CryptoJS from 'crypto-js';

const decryptData = (encryptedData, key) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};


const AdapQuizStore = create((set) => ({
    id: '',
    sectionId: '',
    title : '',
    teacher: '',
    duration: 0,
    closeDate: 0,
    questionsCount: 0,
    description: '',
    className: '',
    marks: 0,
    questions: localStorage.getItem('questions') ? decryptData(JSON.parse(localStorage.getItem('questions')), 'Arete1234') : [],
    currentQuestionIndex: 0,
    quizConfig: JSON.parse(localStorage.getItem('quizConfig')) || {},
    currentQuestionStartTime: Date.now(),
    reachedLastQuestion: false,
    questionAttempt: 0,
    score: 0,
    maxAttempts: 5,
    vioArray: [],
    setVioArray: (newVios) => set((state) => ({...state, vioArray: [...state.vioArray, newVios] })),
    clearVioArray: () => set({ vioArray: [] }),

    responses: [],
    submittingQuiz: false,

    setSubmittingQuiz : () => set((state) => ({...state, submittingQuiz: true})),

    updateQuizDetails: (details) => set((state) => {
        return {
            ...state,
            sectionId: details.sectionId,
            title: details.title,
            teacher: details.teacher,
            duration: details.duration,
            id: details.id,
            closeDate: details.closeDate,
            description: details.description,
            className: details.className,
            marks: details.marks,
            quizConfig: details.quizConfig
        }
    }),

    addResponse: (response) => set((state) => ({
        responses: [...state.responses, response]
    })),

    updateResponse: (questionNumber, updatedResponse) => set((state) => {
        const index = questionNumber

        if (index !== -1) {
            const updatedResponses = [...state.responses];
            updatedResponses[index] = {
            ...updatedResponses[index],
            answer: updatedResponse.answer
            };
            return { responses: updatedResponses };
        } 
    }),

    getResponseByQuestionNumber: (questionNumber) => {
        const state = AdapQuizStore.getState();
        if(state.quizConfig.instantFeedback) {
            const question = state.questions[questionNumber];
            return {
                ...state.responses[questionNumber],
                correctOptions: question ? question.correctOptions : [],
                isTrue: question.isTrue
            };
        }
        else {
            return state.responses[questionNumber]
        }
    },

    setQuestions: (newQuestions) => set({
        questions: newQuestions
    }),
    
    createResponseObjects: (responses) => {
        set((state) =>{
            if(responses == null || responses.length == 0) {
                const emptyResponses = []
                for(let i = 0; i<state.maxAttempts; i++) {
                    const response = {
                        questionId: i == 0 ? state.questions[state.currentQuestionIndex]._id : null,
                        answer: [],
                        responseTime: 0
                    }
                    emptyResponses.push(response)
                }
                return {...state, responses: emptyResponses}
            }
            else {
                return {...state, responses: responses}
            }
        })},
    
    setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

    initializeToEasyQuestion : () => {
        set((state) => {
            const easyQuestionIndex = state.questions.findIndex(
                (question) => question.difficulty === 'Easy'
            );
            return {...state, currentQuestionIndex: easyQuestionIndex };
        })
    }, 
    
    nextQuestion: () => {
        set((state) => {
            let nextState = { ...state };

            const elapsedTime = (Date.now() - state.currentQuestionStartTime) / 1000;
            const responseIndex = state.questionAttempt;
            if (responseIndex !== -1) {
                const existingResponse = state.responses[responseIndex];
                const updatedResponse = {
                    ...existingResponse,
                    responseTime: existingResponse.responseTime + elapsedTime
                };
                nextState.responses = [
                    ...state.responses.slice(0, responseIndex),
                    updatedResponse,
                    ...state.responses.slice(responseIndex + 1)
                ];

                const questionCheck = state.questions[state.currentQuestionIndex]
                let correctAnswer = null

                if(questionCheck.type == 'True/False') {
                    if(questionCheck.isTrue) {
                        correctAnswer = updatedResponse.answer.includes('True')
                    }
                    else {
                        correctAnswer = updatedResponse.answer.includes('False')
                    }
                }
                else {
                    if(questionCheck.correctOptions.every((option) => updatedResponse.answer.includes(option)) && updatedResponse.answer.length == questionCheck.correctOptions.length){
                        correctAnswer = true
                    }
                    else {
                        correctAnswer = false
                    }
                }

                let nextQuestionIndex = 0;
                let score = state.score

                if(correctAnswer) {
                    if(questionCheck.difficulty == 'Easy') {
                        score += 1;
                        nextQuestionIndex =  state.questions.findIndex(question => 
                            question.difficulty === 'Medium' &&
                            !state.responses.some(response => response.questionId === question._id)
                        );
                    }
                    else if(questionCheck.difficulty == 'Medium') {
                        score += 2;
                        nextQuestionIndex =  state.questions.findIndex(question => 
                            question.difficulty === 'Hard' &&
                            !state.responses.some(response => response.questionId === question._id)
                        );
                    }
                    else {
                        score += 3
                        nextQuestionIndex =  state.questions.findIndex(question => 
                            question.difficulty === 'Hard' &&
                            !state.responses.some(response => response.questionId === question._id)
                        );
                    }
                }
                else {
                    if(questionCheck.difficulty == 'Easy') {
                        nextQuestionIndex = state.questions.findIndex(question => 
                            question.difficulty === 'Easy' &&
                            !state.responses.some(response => response.questionId === question._id)
                        );
                    }
                    else if(questionCheck.difficulty == 'Medium') {
                        nextQuestionIndex = state.questions.findIndex(question => 
                            question.difficulty === 'Easy' &&
                            !state.responses.some(response => response.questionId === question._id)
                        );
                    }
                    else {
                        nextQuestionIndex = state.questions.findIndex(question => 
                            question.difficulty === 'Medium' &&
                            !state.responses.some(response => response.questionId === question._id)
                        );
                    }
                }

                console.log(score)

                nextState.responses[state.questionAttempt + 1].questionId = state.questions[nextQuestionIndex]._id
                
                let reachedLast = false;
                if(state.questionAttempt + 1 == state.maxAttempts - 1) {
                    reachedLast = true
                }
                const nextQuestionStartTime = Date.now();
                nextState = { ...nextState, score: score, questionAttempt: state.questionAttempt + 1, currentQuestionIndex: nextQuestionIndex, reachedLastQuestion: reachedLast, currentQuestionStartTime: nextQuestionStartTime };

                return nextState;
            }
        });
    },
       
    
    initializeQuestionStartTime: () => {
        return {
            currentQuestionStartTime: Date.now()
        };
    },
    
    submitResponses: () => {
        set((state) => {
            const nextState = {...state}
            const submissionObj = {
                assessmentId: state.id,
                submit: true
            }
            localStorage.setItem('SuccessSubmit', JSON.stringify(submissionObj))
            const elapsedTime = (Date.now() - state.currentQuestionStartTime) / 1000;
            const responseIndex = state.questionAttempt;
            if (responseIndex !== -1) {
                const existingResponse = state.responses[responseIndex];
                const updatedResponse = {
                    ...existingResponse,
                    responseTime: existingResponse.responseTime + elapsedTime
                };
                nextState.responses = [
                    ...state.responses.slice(0, responseIndex),
                    updatedResponse,
                    ...state.responses.slice(responseIndex + 1)
                ];
            }
            const res = async() => {
                try {
                    if(state.vioArray.length > 0) {
                        const responseId = localStorage.getItem('responseId')
                        const res = await FlagStudents({data: state.vioArray, id: responseId})
                    }
                    const sub = await SubmitAssessment({responses: nextState.responses})
                    console.log(sub)
                    window.location.assign('quiz-submitted')
                } catch(err) {
                    console.log(err)
                }
            }

            res()
            return state;
        })
    },
}));
    
export default AdapQuizStore;