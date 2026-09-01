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
const {t} = useI18n()

</script>

<template>
  <div class="home-page">
    <div class="logo">
      <div class="home-page__image-wrapper">
        <img v-if="currentTheme === 'light'" class="home-page__image" src="/images/logo_light.png">
        <img v-else class="home-page__image" src="/images/logo_dark.png">
      </div>
      <h1 class="name"><b>D20</b> Forge</h1>
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

  &__button {
    align-self: stretch;
  }

  .lang {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  .logo {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    padding-bottom: 20px;

    .name {
      margin-top: -20px;
      color: var(--color-text);
    }

    b {
      color: var(--color-accent);
      font-weight: 600;
    }
  }
}
</style>
