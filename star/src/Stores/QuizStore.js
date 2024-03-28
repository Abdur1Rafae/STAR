import {create} from 'zustand';

const QuizStore = create((set) => ({
  questions: [{
    number:1,
    type: "MCQ",
    question: "Who developed the theory of relativity?",
    options: [
      { text: "Isaac Newton", isCorrect: false },
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

  setQuestions: (newQuestions) => set({ questions: newQuestions }),

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  setFilter: (filter) => {
    set((state) => {
      return {...state, filter: filter}
    });
  },

  nextQuestion: () => {
    set((state) => {
      const nextIndex = (state.currentQuestionIndex + 1) % state.questions.length;
      return { ...state, currentQuestionIndex: nextIndex };
    });
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



