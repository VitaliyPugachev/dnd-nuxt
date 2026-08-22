import type { User } from "@/types/user"
import meApi from '@/api/me'

export const useAuth = defineStore('auth', () => {
  const isAuth = ref(false)
  const user: Ref<User | null> = ref(null)
  const isInitApp = ref(false)

  const setAuthData = (userData: User) => {
    user.value = userData
    isAuth.value = true
  }

  const clearAuthData = () => {
    user.value = null
    isAuth.value = false
  }

  const checkAuth = async () => {
    try {
      const response = await meApi.getMe()

      if (!response.data) {
        throw new Error("Error while resolve user data")
      }

      setAuthData(response.data)
    } catch {      
      clearAuthData()
    } finally {     
      isInitApp.value = true
    }
  }

  return {
    checkAuth,
    setAuthData,
    clearAuthData,
    isAuth,
    isInitApp,
    user
  }
})