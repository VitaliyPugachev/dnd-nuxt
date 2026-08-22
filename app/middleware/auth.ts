export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()
  const { isInitApp, isAuth } = storeToRefs(useAuth())

  if (import.meta.server) {
    return
  }

  if (!isInitApp.value) {    
    await auth.checkAuth()
  }

  if (!isAuth.value) {    
    return navigateTo('/auth')
  }
})