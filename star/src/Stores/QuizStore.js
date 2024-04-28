import {create} from 'zustand';
import { SubmitAssessment } from '../APIS/Student/AssessmentAPI';

const QuizStore = create((set) => ({
  id: '',
  title : '',
  teacher: '',
  duration: 0,
  closeDate: 0,
  questionsCount: 0,
  description: '',
  className: '',
  marks: 0,
  questions: JSON.parse(localStorage.getItem('questions')) || [],
  currentQuestionIndex: 0,
  filter: 'all',
  filteredQuestions: [],
  quizConfig: JSON.parse(localStorage.getItem('quizConfig')) || {},
  currentQuestionStartTime: Date.now(),

  responses: [],

  setTitle: (title) => set({ title: title }),
  setTeacher: (teacher) => set({ teacher: teacher }),
  setDuration: (duration) => set({ duration: duration }),
  setId: (id) => set({ id: id }),
  setCloseDate: (date) => set({ closeDate: date }),
  setCloseTime: (time) => set({ closeTime: time }),
  setDescription: (desc) => set({ description: desc }),

  updateQuizDetails: (details) => set((state) => {
    return {
    ...state,
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

  randomizeOptions: () => {

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
      const nextQuestionStartTime = Date.now();
      nextState = { ...nextState, currentQuestionIndex: nextIndex, currentQuestionStartTime: nextQuestionStartTime };

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
      nextState = { ...nextState, currentQuestionIndex: prevIndex, currentQuestionStartTime: nextQuestionStartTime };

      return nextState;
    });
  },

  markAsAnswered: () => {
    set((state) => {
      const updatedQuestions = state.questions.map((question, index) => {
        if (index === state.currentQuestionIndex) {
          return { ...question, unanswered: false };
        }
        return question;
      });
      return { ...state, questions: updatedQuestions };
    });
  },
   
  flagQuestion: (number) => {
    set((state) => {
      const updatedQuestions = state.questions.map((question, index) => {
        if (index == number) {
          return { ...question, flagged: !question.flagged };
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
          if (question.unanswered) acc.push(index);
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
          const sub = await SubmitAssessment({responses: nextState.responses})
          const submissionObj = {
            assessmentId: state.id,
            submit: true
          }
          localStorage.setItem('SuccessSubmit', JSON.stringify(submissionObj))
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

      const nextQuestionStartTime = Date.now();
      nextState = { ...nextState, currentQuestionIndex: number, currentQuestionStartTime: nextQuestionStartTime };

      return nextState;
    });
  }
}));

export default QuizStore;



