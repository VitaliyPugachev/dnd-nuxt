<script setup lang="ts">

import { useNotificationStore } from '@/stores/notification.ts'

const isOpen = ref(false);
const {showNotification} = useNotificationStore();

const mockAction = () => {
  showNotification('Функционал находится в разработке', 4000, 'error')
}

</script>

<template>
  <section class="actions" :class="{open: isOpen}">
    <div class="actions__buttons">
      <UiButton class="actions__button" label="Меню" @click="() => isOpen = !isOpen">
        <IconsUp v-if="!isOpen"/>
        <IconsDown v-else/>
      </UiButton>
    </div>

    <ul class="actions__list">
      <li>
        <UiButton
          class="actions__list-button"
          label="Печать"
          @click="mockAction"
        />
      </li>
      <li>
        <UiButton
          class="actions__list-button"
          label="Редактировать"
          @click="mockAction"
        />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: translateY(64%);
  box-shadow: 0 4px 20px rgba(0, 0 ,0 , 0.15);
  border-radius: 8px;
  background: var(--color-main);
  padding: 12px 10px;
  z-index: 10;
  transition: 0.3s ease;

  &.open {
    transform: translateY(0%);
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  &__button {
    flex: 1 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;

  }

  &__list-button {
    width: 100%;
  }
}
</style>
