<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification.ts'
import { storeToRefs } from 'pinia'

const {isOpen, message, mode} = storeToRefs(useNotificationStore())
const {closeNotification} = useNotificationStore()
</script>

<template>
  <transition name="slide-notify" mode="out-in">
    <div class="notification" v-if="isOpen">
      <div class="notification__icon-wrapper">
        <IconsDice class="notification__icon" :mode="mode"/>
      </div>
      <span class="notification__text">
        {{message}}
      </span>
      <UiButton clear-background small fit borderless @click="closeNotification">
        <IconsClose/>
      </UiButton>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.notification {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 12px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-bg-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10000;
  box-shadow: var(--shadow-md);
  color: var(--color-text);
  outline: double;
  outline-offset: -2px;
  outline-color: var(--color-text);

  &__icon-wrapper {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    height: 40px;
    width: 40px;
    position: relative;
    color: var(--color-text);
    stroke: var(--color-text);
  }
}

.slide-notify-enter-active,
.slide-notify-leave-active {
  transition: all 0.4s;
}
.slide-notify-enter-from,
.slide-notify-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
