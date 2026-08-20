import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { ThemeType } from '@/types/ThemeModel.ts'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<ThemeType>('light');

  const getThemeFromStorage = () => {
    if (typeof window !== 'undefined') {
      const theme = window.localStorage.getItem('theme') as ThemeType || undefined
      currentTheme.value = theme || 'light'
    }
  }

  const changeTheme = () => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
    currentTheme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  return {
    currentTheme,
    changeTheme,
    getThemeFromStorage
  }
})
