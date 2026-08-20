<script setup lang="ts">
  import { watch, onMounted, onUnmounted } from 'vue'

  const props = defineProps({
    visible: Boolean,
  })

  const emit = defineEmits(['close'])

  const close = () => {
    emit('close')
  }

  // Блокировка скролла
  const toggleBodyScroll = (enabled: boolean) => {
    document.body.style.overflow = enabled ? 'hidden' : ''
  }

  watch(() => props.visible, (newVal) => {
    toggleBodyScroll(newVal)
  })

  onMounted(() => {
    if (props.visible) toggleBodyScroll(true)
  })

  onUnmounted(() => {
    toggleBodyScroll(false)
  })
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0.5); /* затемнение */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--color-main);
  padding: 16px;
  border-radius: 12px;
  max-width: 90%;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 100%;
  height: fit-content;
}

/* Анимация фона */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Анимация окна */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

</style>
