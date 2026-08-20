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
    <select v-if="type === 'select'" class="rounded-input__input select" v-model="model">
      <template v-for="(opt, i) in options" :key="opt?.id ? opt?.id : i">
        <option class="rounded-input__option">
          {{opt}}
        </option>
      </template>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.rounded-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--color-accent-secondary);
  box-shadow: 0 4px 20px rgba(0, 0 ,0 , 0.15);
  color: var(--color-text);

  &__label {

    &.textarea {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: start;
    }
  }

  &__input {
    width: 100%;
    flex: 1 0;
    border: none;
    outline: none;
    font-weight: 600;

    &.select {
      background: var(--color-accent-secondary);
      color: var(--color-text);
    }
  }
}
</style>
