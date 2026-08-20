<script setup lang="ts">
const hasInspiration = defineModel<boolean>('inspiration');
</script>

<template>
  <div class="inspiration" :class="{active: hasInspiration}">
    <span>
      В
    </span>
  </div>
</template>

<style lang="scss" scoped>
.inspiration {
  padding: 4px;
  border-radius: 999px;
  border: 1px solid var(--color-secondary);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.active {
  background: gold;
}
</style>
