<script lang="ts" setup>
defineProps<{content: string}>()
</script>

<template>
  <h4 class="title">
    {{ content }}
    <div class="overlay">
      <slot/>
    </div>
  </h4>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: var(--font-size-lg);
  letter-spacing: 0.06em;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  position: relative;
  width: 100%;
  padding: 12px 30px 8px 30px;
  gap: 12px;

  
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 4px;
    background: linear-gradient(to right, transparent, var(--color-border));
  }

  &::after {
    background: linear-gradient(to left, transparent, var(--color-border));
  }

  .overlay {
    position: absolute;
    right: 0;
    top: 10px;
    &:empty {
      display: none;
    }
  }
}
</style>