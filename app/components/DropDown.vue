<script setup lang="ts">

defineProps<{label?: string}>()
const isOpen = defineModel<boolean>();
</script>

<template>
  <div class="dropdown">
    <div class="dropdown__label" @click="isOpen = !isOpen">
      <span class="dropdown__label-text">
        {{label}}
      </span>
      <IconsDown v-if="!isOpen"/>
      <IconsUp v-else/>
    </div>
    <div class="dropdown__content" v-show="isOpen">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  &__label {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--color-secondary);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label-text {
    user-select: none;
    font-weight: 600;
    font-size: 17px;
  }

  &__content {
    padding: 12px 0;
    display: flex;
    gap: 12px;
    flex-direction: column;
  }
}
</style>
