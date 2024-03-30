import { create } from "zustand";

const store = (set) => ({
    showNav: false,
    QuizResultTab: true,
    TeacherSidebar: false,
    toggleNav: () => set((store)=> ({showNav: !(store.showNav)})),
    switchTab: () => set((store)=> ({QuizResultTab: !(store.QuizResultTab)})),
    toggleSidebar: () => set((store)=> ({TeacherSidebar: !(store.TeacherSidebar)}))
})

export const ToggleStore = create(store);