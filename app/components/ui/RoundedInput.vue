<script setup lang="ts">

defineProps<{
  label: string,
  type: 'input' | 'select' | 'textarea',
  options?: unknown[],
  inputType?: 'text' | 'password' | 'email' | 'number',
  placeholder?: string,
}>();

const model = defineModel<number | string>({required: true});

</script>

<template>
  <div class="rounded-input">
    <label class="rounded-input__label" :class="{textarea: type === 'textarea'}">
      {{label}}
    </label>

    <input
      v-model="model"
      :placeholder
      :type="inputType"
      class="rounded-input__input"
      v-if="type === 'input'"
    >
    <textarea v-if="type === 'textarea'" class="rounded-input__input" v-model="model"/>
    <template v-if="type === 'select'">
      <div class="visible-select">
        <span v-if="model" class="content">{{ model }}<IconsDown/></span>
        <span v-else class="content placeholder">{{ placeholder }}<IconsDown/></span>

        <select class="rounded-input__input select" v-model="model">
          <template v-for="(opt, i) in options" :key="opt?.id ? opt?.id : i">
            <option class="rounded-input__option">
              {{opt}}
            </option>
          </template>
        </select>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.rounded-input {
  font-size: var(--font-size-md);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 10px;

  &__label {
    font-weight: 600;
    color: var(--color-text);

    &.textarea {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: start;
    }
  }

  &__input {
    width: 100%;
    border: none;
    outline: none;
    font-weight: 600;
    grid-column: 2 / span 2;

    &.select {
      position: absolute;
      inset: 0;
      outline: none;
      opacity: 0;
    }
  }

  .visible-select {
    position: relative;
    background: var(--color-bg);
    padding: 8px 12px;
    color: var(--color-input-text);
    border: 1px solid var(--color-input-border);
    border-radius: var(--radius-md);
    width: 100%;
    grid-column: 2 / span 2;

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
    }

    .placeholder {
      color: var(--color-input-placeholder);
    }
  }
}
</style>
