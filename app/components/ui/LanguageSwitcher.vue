<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const {locale} = useI18n()
const language = ref<'ru' | 'en'>('ru')
const changeLanguage = () => {
  locale.value = language.value
}
</script>

<template>
  <select v-model="language" class="language" @change="changeLanguage">
    <option value="ru">Русский</option>
    <option value="en">English</option>
  </select>
</template>

<style lang="scss" scoped>
.language {
  background: none;
  border: none;
}
</style>
