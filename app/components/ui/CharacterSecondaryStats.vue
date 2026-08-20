<script setup lang="ts">
defineProps<{hp?: number, armor?: number, initiative?: number, speed?: number, small?: boolean}>()
</script>

<template>
  <section class="stats" :class="{small: small}">
    <ul class="stats__list">
      <li class="stats__item" v-if="armor !== undefined">
        <span class="stats__value">
          {{armor}}
        </span>
        <span class="stats__label">
          Класс доспехов
        </span>
      </li>

      <div class="stats__divider" v-if="armor !== undefined"></div>

      <li class="stats__item" v-if="hp !== undefined">
        <span class="stats__value">
          {{hp}}
        </span>
        <span class="stats__label">
          Хиты
        </span>
      </li>

      <div class="stats__divider" v-if="hp !== undefined"></div>

      <li class="stats__item" v-if="initiative !== undefined">
        <span class="stats__value">
          {{`${initiative > 0 ? '+' : ''}${initiative}`}}
        </span>
        <span class="stats__label">
          Инициатива
        </span>
      </li>

      <div class="stats__divider" v-if="initiative !== undefined"></div>

      <li class="stats__item" v-if="speed !== undefined">
        <span class="stats__value">
          {{speed}}
        </span>
        <span class="stats__label">
          Скорость
        </span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.stats {
  padding: 20px 10px;
  box-shadow: 0px 0px 10px var(--color-text);
  border-radius: 12px;

  &.small {
    padding: 12px 8px;
  }

  &__divider {
    align-self: stretch;
    border: 1px solid #ccc;
  }

  &__list {
    display: flex;
    gap: 4px;
  }

  &__item {
    flex: 1 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px;
    justify-content: space-between;
  }

  &__value {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text);
  }

  &__label {
    font-size: 12px;
    text-align: center;
    color: var(--color-text);
  }
}
</style>
