<script lang="ts" setup>
</script>

<template>
  <div class="text-decorator">
    <span>
      <slot/>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.text-decorator {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-text-secondary);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
  font-size: var(--font-size-lg);

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--color-border));
  }

  &::after {
    background: linear-gradient(to left, transparent, var(--color-border));
  }
}
</style>