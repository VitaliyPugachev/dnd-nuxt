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
      <UiButton clear-background small borderless @click="closeNotification">
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
  padding: 20px;
  border-radius: 8px;
  background: white;
  border: 1px solid var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10000;

  &__code {
    position: absolute;
    top: 16px;
    left: 14px;
    font-size: 10px;
    font-weight: 600;
    z-index: 2;
  }

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
