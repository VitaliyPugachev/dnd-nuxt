<script setup lang="ts">
interface TabModel {
  label: string,
  value: string
}
defineProps<{tabs: TabModel[]}>();

const model = defineModel<string>({required: true})

const onTabSelect = (tabValue: string) => {
  model.value = tabValue
}
</script>

<template>
  <div class="tabs">
    <template v-for="tab in tabs">
      <div
        class="tabs__item"
        :class="{selected: model === tab.value}"
        @click="onTabSelect(tab.value)"
      >
        {{tab.label}}
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  gap: 10px;

  &__item {
    flex: 1 0;
    text-align: center;
    padding: 8px 12px;
    font-size: 18px;
    border-bottom: 2px solid transparent;
    user-select: none;
    cursor: pointer;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);

    &.selected {
      background: var(--color-accent-soft);
    }
  }
}
</style>
