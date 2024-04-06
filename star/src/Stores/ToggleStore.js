import { create } from "zustand";

const store = (set) => ({
    showNav: false,
    QuizResultTab: true,
    TeacherSidebar: false,
    Ordering: false,
    toggleNav: () => set((store)=> ({showNav: !(store.showNav)})),
    switchTab: () => set((store)=> ({QuizResultTab: !(store.QuizResultTab)})),
    toggleSidebar: () => set((store)=> ({TeacherSidebar: !(store.TeacherSidebar)})),
    setOrder: () => set((store)=> ({Ordering: !(store.Ordering)}))
})

export const ToggleStore = create(store);