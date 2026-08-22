<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

definePageMeta({
  middleware: 'auth'
})

const router = useRouter();
const {currentTheme} = storeToRefs(useThemeStore())
const {changeTheme} = useThemeStore()
const {t} = useI18n()

</script>

<template>
  <div class="home-page">
    <div class="home-page__image-wrapper">
      <img class="home-page__image" src="/icons/logo.webp">
    </div>
    <UiButton
      :label="t('home.newCharacter')"
      class="home-page__button"
      primary
      @click="router.push('/create')"
    />
    <UiButton
      :label="t('home.myCharacters')"
      class="home-page__button"
      @click="router.push('/select')"
    />
    <div
      class="home-page__theme-switcher"
      :class="currentTheme"
      @click="changeTheme"
    >
      <IconsMoon v-if="currentTheme === 'light'"/>
      <IconsSun v-else class="home-page__sun-icon"/>
    </div>
    <LanguageSwitcher class="lang"/>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  position: relative;
  height: 90vh;
  width: 100%;

  &__image-wrapper {
    width: 220px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    height: 100%;
    object-fit: cover;
    margin-top: 20px;
  }

  &__theme-switcher {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 32px;

    &.dark {
      color: var(--color-text-inverted);
    }
  }

  &__button {
    align-self: stretch;
  }

  .lang {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>
