<script setup lang="ts">

const props = defineProps<{text?: string}>()
const isPopupShown = ref(false)
const togglePopup = () => {
  isPopupShown.value = !isPopupShown.value
}
const closePopup = () => {
  isPopupShown.value = false
}
</script>

<template>
  <div class="info-popup">
    <IconsInfo class="info-popup__icon" @click="togglePopup"/>
    <Transition name="popup">
      <div v-if="isPopupShown" @click.self="closePopup" class="info-popup__outlay">
        <div class="info-popup__content">
          <span class="info-popup__text">
            {{text}}
          </span>
          <UiButton
            class="info-popup__close-button"
            clear-background
            small
            borderless
            fit
            @click="closePopup"
          >
            <IconsClose/>
          </UiButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.info-popup {
  &__icon {
    height: 32px;
    width: 32px;
    color: var(--color-text);
  }

  &__outlay {
    z-index: 1000;
    position: fixed;
    inset: 0;
    background: var(--color-overlay);
  }

  &__content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: fit-content;
    padding: 16px;
    background: var(--color-bg);
    z-index: 2;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
    outline: double;
    outline-offset: -4px;
    outline-color: var(--color-accent);
    max-height: 90svh;
    overflow-y: auto;
  }

  &__close-button {
    align-self: start;
  }

  &__text {
    font-size: 16px;
    white-space: pre-line;
    color: var(--color-text);
    text-align: start;
  }
}

.popup-enter-from .info-popup__content,
.popup-leave-to .info-popup__content {
  transform: translateY(100%);
}

.popup-enter-to .info-popup__content,
.popup-leave-from .info-popup__content {
  transform: translateY(0);
}

/* overlay fade */
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s ease;
}
</style>
