import {create} from 'zustand';

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
    const index = state.responses.findIndex(response => response.number === questionNumber)

    if (index !== -1) {
        return {
          responses: state.responses.map((response, i) => 
            i === index ? updatedResponse : response
          )
        };
    }

    return {
        responses: [...state.responses, updatedResponse]
    };
  }),

  getResponseByQuestionNumber: (questionNumber) => {
    const state = QuizStore.getState();
    return state.responses.find(response => response.number === questionNumber);
  },

  setQuestions: (newQuestions) => set({
    questions: newQuestions
  }),

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  setFilter: (filter) => {
    set((state) => {
      return {...state, filter: filter}
    });
  },

  nextQuestion: () => {
    set((state) => {
       let nextState = { ...state };
   
       if (state.quizConfig.navigation == false) {
         const elapsedTime = (Date.now() - state.currentQuestionStartTime)/1000;
         console.log(state.currentQuestionStartTime)
         console.log(elapsedTime);
         const responseIndex = state.responses.findIndex(response => response.number === state.currentQuestionIndex + 1);
         if (responseIndex !== -1) {
           const updatedResponse = { ...state.responses[responseIndex], elapsedTime: elapsedTime };
           nextState.responses = [
             ...state.responses.slice(0, responseIndex),
             updatedResponse,
             ...state.responses.slice(responseIndex + 1)
           ];
         }
       }
   
       const nextIndex = Math.min(state.currentQuestionIndex + 1, state.questions.length - 1);
       const nextQuestionStartTime = Date.now();
       nextState = { ...nextState, currentQuestionIndex: nextIndex, currentQuestionStartTime: nextQuestionStartTime };
   
       return nextState;
    });
   },
   

   initializeQuestionStartTime: () => {
    console.log("Current timestamp:", Date.now());
    return {
      currentQuestionStartTime: Date.now()
    };
   },

  prevQuestion: () => {
    set((state) => {
      if(state.currentQuestionIndex == 0) {
        return state
      }
      const prevIndex = (state.currentQuestionIndex - 1) % state.questions.length;
      return { ...state, currentQuestionIndex: prevIndex };
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
   
  flagQuestion: () => {
    set((state) => {
        const updatedQuestions = state.questions.map((question, index) => {
          if (index === state.currentQuestionIndex) {
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
        filteredQuestions = [...state.questions];
      } else if (state.filter === 'flagged') {
        filteredQuestions = state.questions.filter((question) => question.flagged);
      } else if (state.filter === 'unanswered') {
        filteredQuestions = state.questions.filter((question) => question.unanswered);
      }
      return { ...state, filteredQuestions };
    });
  },

  selectQuestionFromFiltered: (number) => {
    set((state) => {
      return { ...state, currentQuestionIndex: number - 1 };
    });
  }
}));

export default QuizStore;



