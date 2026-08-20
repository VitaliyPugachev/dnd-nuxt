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
  </main>
</template>

<style lang="scss" scoped>
.layout {
  background: var(--color-main);
  min-height: 100svh;
  padding: 32px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 480px;
  margin: 0 auto;

  &.app-dark-theme {
    background:
      url('/images/bg-dark.webp') repeat,
      linear-gradient(#f6eedc, #ece1c4);
    background-size: auto 100%;
  }

  &.app-light-theme {
    background:
      url('/images/bg-light.webp') repeat,
      linear-gradient(#f6eedc, #ece1c4);
    background-size: cover;       /* Растягивает фон на всю ширину и высоту */
    background-position: bottom;
  }

  @media screen and (min-width: 400px){
    padding-inline: 30px;
  }
}
</style>