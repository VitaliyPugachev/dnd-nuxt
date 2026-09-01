export const useSidebarStore = defineStore('sidebar', () => {
  const isOpen = ref(false)

  const toggleMenu = () => {
    isOpen.value = !isOpen.value
  }
  const closeMenu = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    toggleMenu,
    closeMenu,
  }
})
