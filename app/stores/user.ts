import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userId = ref('');
  const isAuth = computed(() => {
    return Boolean(userId.value);
  })

  const setUserId = (id?: string) => {
    if (!id) return;
    userId.value = id;
  }

  return {
    userId,
    isAuth,
    setUserId
  }
})
