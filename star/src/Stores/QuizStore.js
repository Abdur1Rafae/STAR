import {create} from 'zustand';

const QuizStore = create((set) => ({
  id: '',
  title : '',
  teacher: '',
  duration: 0,
  closeDate: 0,
  closeTime: 0,
  questionsCount: 0,
  description: '',
  className: '',
  marks: 0,
  questions: [{
    number:1,
    type: "MCQ",
    question: "Who developed the theory of relativity?",
    options: [
      { text: "Isaac Newton ewlfkwef lkefmwe lkmfw lorem*10 eroifwenf rfewonf ofinernf  weoif foeiwf foienfew oirenf o", isCorrect: false },
      { text: "Albert Einstein", isCorrect: true },
      { text: "Stephen Hawking", isCorrect: false },
      { text: "Galileo Galilei", isCorrect: false }
    ],
    imageUrl: "https://scitechdaily.com/images/Theory-of-Relativity-Physics-Concept.jpg",
    point: 20.,
    unanswered: true,
    flagged: false 
  },
  {
    number:2,
    type: "T/F",
    question: "The mitochondria is the powerhouse of the cell.",
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false }
    ],
    imageUrl: null,
    point: 15,
    unanswered: true,
    flagged: false 
  },
  {
    number:3,
    type: "SA",
    question: "What is the capital of Mongolia?",
    options: [],
    imageUrl: null,
    point: 15,
    unanswered: false,
    flagged: true 
  },
  {
    number:4,
    type: "MCQ",
    question: "Which country has the largest population?",
    options: [
      { text: "India", isCorrect: false },
      { text: "United States", isCorrect: false },
      { text: "China", isCorrect: true },
      { text: "Russia", isCorrect: false }
    ],
    imageUrl: null,
    point: 15,
    unanswered: false,
    flagged: true 
  },
  {
    number:5,
    type: "T/F",
    question: "The Amazon Rainforest produces 20% of the world's oxygen.",
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false }
    ],
    imageUrl: "https://files.worldwildlife.org/wwfcmsprod/images/Amazon_River_New_Hero_Image/hero_full/96jxl0p02y_Amazon_River_Hero.jpg",
    point: 20,
    unanswered: false,
    flagged: false 
  },
  {
    number:6,
    type: "SA",
    question: "What is the formula for calculating the area of a circle?",
    options: [],
    imageUrl: null,
    point: 20,
    unanswered: false,
    flagged: false 
  }],
  currentQuestionIndex: 0,
  filter: 'all',
  filteredQuestions: [],
  quizConfig: {
    adaptiveTesting: false,
    instantFeedback: false,
    navigation: false,
    randomizeQuestions: false,
    randomizeAnswers: false
  },
  currentQuestionStartTime: null,

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
    closeTime: details.closeTime,
    description: details.description,
    className: details.className,
    marks: details.marks
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

  setQuestions: (newQuestions) => set({ questions: newQuestions }),

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
   

  initializeQuestionStartTime: () => ({
    currentQuestionStartTime: Date.now()
  }),

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



