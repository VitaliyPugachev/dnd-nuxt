<script setup lang="ts">
  import { useThemeStore } from '@/stores/themeStore.ts'
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const {currentTheme} = storeToRefs(useThemeStore());
const {getThemeFromStorage} = useThemeStore();
const theme = computed(() => {
  return `app-${currentTheme.value}-theme`
})

onMounted(() => {
  getThemeFromStorage()
})
</script>

<template>
  <main :class="['layout', theme]">
    <NuxtPage/>
    <UiAppNotification/>
    <WidgetsSidebar/>
  </main>
</template>

<style lang="scss" scoped>
.layout {
  background: var(--color-bg);
  height: 100svh;
  overflow: auto;
  padding: 0 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 767px;
  margin: 0 auto;

  &.app-dark-theme {
    background:
      linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url('/images/background_dark.png');
    background-size: cover;
  }

  &.app-light-theme {
    background:
      url('/images/background_light.png');
    background-size: cover;       /* Растягивает фон на всю ширину и высоту */
    background-position: bottom;
  }
}
</style>