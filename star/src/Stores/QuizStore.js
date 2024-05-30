import {create} from 'zustand';
import { SubmitAssessment } from '../APIS/Student/AssessmentAPI';
import { FlagStudents } from '../APIS/Student/AssessmentAPI';
import CryptoJS from 'crypto-js';

const decryptData = (encryptedData, key) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

const QuizStore = create((set) => ({
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
  setCurrentQuestionIndex : (num) => set((state) => ({...state, currentQuestionIndex: Number(num)})),
  filter: 'all',
  filteredQuestions: [],
  quizConfig: JSON.parse(localStorage.getItem('quizConfig')) || {},
  currentQuestionStartTime: Date.now(),
  reachedLastQuestion: false,
  setReachedLastQuestion : () => set((state)=> ({...state, reachedLastQuestion: true})),
  vioArray: [],
  setVioArray: (newVios) => set((state) => ({...state, vioArray: [...state.vioArray, newVios] })),
  clearVioArray: () => set({ vioArray: [] }),

  responses: [],
  
  submittingQuiz: false,

  setSubmittingQuiz : () => set((state) => ({...state, submittingQuiz: true})),

  setTitle: (title) => set({ title: title }),
  setTeacher: (teacher) => set({ teacher: teacher }),
  setDuration: (duration) => set({ duration: duration }),
  setId: (id) => set({ id: id }),
  setCloseDate: (date) => set({ closeDate: date }),
  setCloseTime: (time) => set({ closeTime: time }),
  setDescription: (desc) => set({ description: desc }),

  updateQuizDetails: (details) => set((state) => {
    let reachedLast = false;
    if(state.questions.length == 1) {
      reachedLast = true
    }
    return {
    ...state,
    reachedLastQuestion: reachedLast,
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
 } }),

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
    const state = QuizStore.getState();
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

  randomizeQuestions: () => {
    set((state) => {
      const questionSet = [...state.questions];
      for (let i = questionSet.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionSet[i], questionSet[j]] = [questionSet[j], questionSet[i]];
      }
      return { ...state, questions: questionSet };
    });
  },

  setQuestions: (newQuestions) => set({
    questions: newQuestions
  }),

  createResponseObjects: (responses) => {
    set((state) =>{
      if(responses == null || responses.length == 0) {
        const emptyResponses = []
        state.questions.forEach((question) => {
          const response = {
            questionId: question._id,
            answer: [],
            responseTime: 0
          }
          emptyResponses.push(response)
        })
        return {...state, responses: emptyResponses}
      }
      else {
        return {...state, responses: responses}
      }
    
  })},

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  setFilter: (filter) => {
    set((state) => {
      return {...state, filter: filter}
    });
  },

  nextQuestion: () => {
    set((state) => {
      let nextState = { ...state };

      const elapsedTime = (Date.now() - state.currentQuestionStartTime) / 1000;
      const responseIndex = state.currentQuestionIndex;
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
      const nextIndex = Math.min(state.currentQuestionIndex + 1, state.questions.length - 1);
      let reachedLast = false;
      if(nextIndex == state.questions.length - 1) {
        reachedLast = true
      }
      const nextQuestionStartTime = Date.now();
      nextState = { ...nextState, currentQuestionIndex: nextIndex, reachedLastQuestion: reachedLast, currentQuestionStartTime: nextQuestionStartTime };

      return nextState;
    });
  },
   

  initializeQuestionStartTime: () => {
    return {
      currentQuestionStartTime: Date.now()
    };
  },

  prevQuestion: () => {
    set((state) => {
      if(state.currentQuestionIndex == 0) {
        return state
      }
      let nextState = { ...state };
      const elapsedTime = (Date.now() - state.currentQuestionStartTime) / 1000;
      const responseIndex = state.currentQuestionIndex;
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
    
      const prevIndex = (state.currentQuestionIndex - 1) % state.questions.length;
      const nextQuestionStartTime = Date.now();
      nextState = { ...nextState, currentQuestionIndex: prevIndex, reachedLastQuestion: false, currentQuestionStartTime: nextQuestionStartTime };

      return nextState;
    });
  },
   
  flagQuestion: (number) => {
    set((state) => {
      const updatedQuestions = state.questions.map((question, index) => {
        if (index == number) {
          return { ...question, flagged: (question.flagged !==undefined ? !question.flagged : true) };
        }
        return question;
      });
      return { ...state, questions: updatedQuestions };
    });
  },

  filterQuestions: () => {
    set((state) => {
      let filteredQuestions = [];
      if (state.filter === 'all') {
        filteredQuestions = state.questions.map((_, index) => index);
      } else if (state.filter === 'flagged') {
        filteredQuestions = state.questions.reduce((acc, question, index) => {
          if (question.flagged) acc.push(index);
          return acc;
        }, []);
      } else if (state.filter === 'unanswered') {
        filteredQuestions = state.questions.reduce((acc, question, index) => {
          if (state.responses[index].answer.length == 0 || state.responses[index].answer[0] == null || state.responses[index].answer[0] == '') acc.push(index);
          return acc;
        }, []);
      }
      return { ...state, filteredQuestions };
    });
  },
  

  submitResponses: () => {
    set((state) => {
      const nextState = {...state}
      const elapsedTime = (Date.now() - state.currentQuestionStartTime) / 1000;
      const responseIndex = state.currentQuestionIndex;
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
          const sub = await SubmitAssessment({responses: nextState.responses, action: 'submit', adaptiveTesting: false, showFinalScore: state.quizConfig.finalScore, totalScore: null})
          console.log(sub)
          if(state.quizConfig.finalScore && sub.data.finalScore) {
            sessionStorage.setItem('Score', sub.data.finalScore)
          }
          window.location.assign('quiz-submitted')
        } catch(err) {
          console.log(err)
        }
      }

      res()
      return state;
    })
  },

  saveResponses: () => {
    set((state) => {
      const nextState = {...state}
      const elapsedTime = (Date.now() - state.currentQuestionStartTime) / 1000;
      const responseIndex = state.currentQuestionIndex;
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
          const sub = await SubmitAssessment({responses: nextState.responses, action: 'save', adaptiveTesting: false, showFinalScore: state.quizConfig.finalScore, totalScore: null})
          console.log(sub)
        } catch(err) {
          console.log(err)
        }
      }

      res()
      return state;
    })
  },

  selectQuestionFromFiltered: (number) => {
    set((state) => {
      let nextState = { ...state };
      const elapsedTime = (Date.now() - state.currentQuestionStartTime) / 1000;
      const responseIndex = state.currentQuestionIndex
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

      let reachedLast = false;
      if(number == state.questions.length - 1) {
        reachedLast = true
      }
      const nextQuestionStartTime = Date.now();
      nextState = { ...nextState, currentQuestionIndex: number,reachedLastQuestion: reachedLast, currentQuestionStartTime: nextQuestionStartTime };

      return nextState;
    });
  }
}));

export default QuizStore;



