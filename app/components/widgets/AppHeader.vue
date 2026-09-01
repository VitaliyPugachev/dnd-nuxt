<script lang="ts" setup>
const {currentTheme} = storeToRefs(useThemeStore())
const { toggleMenu } = useSidebarStore();

</script>

<template>
  <header class="app-header">
    <UiButton class="menu" @click="toggleMenu" fit borderless>
      <IconsMenu/>
    </UiButton>
    <div class="logo">
      <div class="image-wrapper">
        <img v-if="currentTheme === 'light'" class="image" src="/images/logo_light.png">
        <img v-else class="image" src="/images/logo_dark.png">
      </div>
      <h1 class="name"><b>D20</b> Forge</h1>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  z-index: 1000;
  margin: 0 -16px;
  padding-inline: 30px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-md);
  border-bottom-left-radius: var(--radius-md);
  border-bottom-right-radius: var(--radius-md);

  .logo {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 14px;

    .name {
      color: var(--color-text);
    }

    b {
      color: var(--color-accent);
      font-weight: 600;
    }
  }

  .image-wrapper {
    width: 32px;
    height: 32px;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .menu {
    position: absolute;
    left: 22px;
  }
}
</style>