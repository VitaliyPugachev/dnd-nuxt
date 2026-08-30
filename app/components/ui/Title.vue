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
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  position: relative;
  width: 100%;
  padding: 12px 0 8px 0;
  
  &::before,
  &::after {
    content: "";
  display: inline-block;
  width: 50px;           /* Общая длина орнамента (линия + ромбы) */
  height: 8px;           /* Высота, достаточная для вертикальных ромбов */
  
  /* Рисуем узор: линия -> горизонтальный ромб -> верхний/нижний ромбы -> центральный ромб -> линия */
  background: 
    linear-gradient(135deg, transparent 50%, var(--color-primary) 50%) 0 0 / 50% 50% no-repeat,
    linear-gradient(225deg, transparent 50%, var(--color-primary) 50%) 100% 0 / 50% 50% no-repeat,
    linear-gradient(315deg, transparent 50%, var(--color-primary) 50%) 100% 100% / 50% 50% no-repeat,
    linear-gradient(45deg, transparent 50%, var(--color-primary) 50%) 0 100% / 50% 50% no-repeat;
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