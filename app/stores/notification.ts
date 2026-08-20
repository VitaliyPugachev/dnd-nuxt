
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', () => {
  const isOpen = ref(false);
  const message = ref('');
  const mode = ref<'error' | 'success'>('success')
  const closeNotification = () => {
    isOpen.value = false;
  }

  const showNotification = (new_message: string, autoCloseTime?: number, new_mode?: 'error' | 'success') => {
    message.value = new_message;
    mode.value = new_mode || 'success';
    isOpen.value = true;

    if (autoCloseTime) {
      setTimeout(() => {
        isOpen.value = false;
      }, autoCloseTime)
    }
  }

  return {showNotification, isOpen, message, mode, closeNotification}
})
