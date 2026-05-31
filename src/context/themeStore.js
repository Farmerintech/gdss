import { create } from "zustand";

const preferredTheme = () => {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("memories-theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useThemeStore = create((set, get) => ({
  theme: preferredTheme(),
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("memories-theme", next);
    set({ theme: next });
  }
}));
