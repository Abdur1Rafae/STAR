import { create } from "zustand";

const store = (set) => ({
    questionSet: [],
    currentQuestion: 0,
    addQuestions: (Questions) => set(()=> ({questionSet: Questions}))
})

export const QuestionStore = create(store);