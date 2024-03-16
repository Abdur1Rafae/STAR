import {create} from 'zustand';

const QuizStore = create((set) => ({
  questions: [{
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
    unanswered: false,
    flagged: true 
  },
  {
    type: "T/F",
    question: "The mitochondria is the powerhouse of the cell.",
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false }
    ],
    imageUrl: null,
    point: 15,
    unanswered: false,
    flagged: true 
  },
  {
    type: "SA",
    question: "What is the capital of Mongolia?",
    options: [],
    imageUrl: null,
    point: 15,
    unanswered: false,
    flagged: true 
  },
  {
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
    type: "T/F",
    question: "The Amazon Rainforest produces 20% of the world's oxygen.",
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false }
    ],
    imageUrl: "https://files.worldwildlife.org/wwfcmsprod/images/Amazon_River_New_Hero_Image/hero_full/96jxl0p02y_Amazon_River_Hero.jpg",
    point: 20,
    unanswered: false,
    flagged: true 
  },
  {
    type: "SA",
    question: "What is the formula for calculating the area of a circle?",
    options: [],
    imageUrl: null,
    point: 20,
    unanswered: false,
    flagged: true 
  }], // Array to store the questions
  currentQuestionIndex: 0, // Index of the current question
  filter: 'all', // Filter for displaying questions (all, flagged, unanswered)
  filteredQuestions: [], // Array to store the filtered questions

  // Function to set the questions in the store
  setQuestions: (newQuestions) => set({ questions: newQuestions }),

  // Function to set the current question index
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  // Function to set the filter
  setFilter: (filter) => {
    set({ filter });
    set((state) => {
      state.filter === filter || state.filterQuestions();
    });
  },

  // Function to move to the next question
  nextQuestion: () => {
    set((state) => {
      const nextIndex = (state.currentQuestionIndex + 1) % state.questions.length;
      return { ...state, currentQuestionIndex: nextIndex };
    });
  },

  // Function to move to the previous question
  prevQuestion: () => {
    set((state) => {
      if(state.currentQuestionIndex == 0) {
        return state
      }
      const prevIndex = (state.currentQuestionIndex - 1) % state.questions.length;
      return { ...state, currentQuestionIndex: prevIndex };
    });
  },

  // Function to mark a question as answered
  markAsAnswered: () => {
    set((state) => {
      state.questions[state.currentQuestionIndex].unanswered = false;
    });
  },

  // Function to flag a question
  flagQuestion: () => {
    set((state) => {
      state.questions[state.currentQuestionIndex].flagged = true;
    });
  },

  // Function to filter and update the filtered questions
  filterQuestions: () => {
    set((state) => {
      const { questions, filter } = state;
      let filteredQuestions = [];
      if (filter === 'all') {
        filteredQuestions = [...questions];
      } else if (filter === 'flagged') {
        filteredQuestions = questions.filter((question) => question.flagged);
      } else if (filter === 'unanswered') {
        filteredQuestions = questions.filter((question) => question.unanswered);
      }
      state.filteredQuestions = filteredQuestions;
    });
  },

  // Function to handle selection of a question from the filtered set
  selectQuestionFromFiltered: (index) => {
    set((state) => {
      const selectedQuestion = state.filteredQuestions[index];
      const originalIndex = state.questions.findIndex((question) => question === selectedQuestion);
      if (originalIndex !== -1) {
        state.currentQuestionIndex = originalIndex;
      }
    });
  },
}));

export default QuizStore;



