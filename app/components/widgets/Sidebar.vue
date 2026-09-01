<script setup lang="ts">

const { isOpen } = storeToRefs(useSidebarStore())
const { closeMenu } = useSidebarStore()
const {currentTheme} = storeToRefs(useThemeStore())
const {changeTheme} = useThemeStore()

</script>

<template>
  <div>
    <Transition name="slide">
      <div v-if="isOpen" class="sidebar-wrapper">
        <div class="sidebar-overlay" @click="closeMenu"></div>
        <aside class="sidebar-content" @click="closeMenu">
          <UiTextDecorator>
            Навигация
          </UiTextDecorator>
          <NuxtLink to="/">
            <IconsHome/>
            Главная
          </NuxtLink>
          <NuxtLink to="/create" @click="closeMenu">
            <IconsAddPerson/>
            Создать персонажа
          </NuxtLink>
          <NuxtLink to="/select" @click="closeMenu">
            <IconsPeople/>
            Мои персонажи
          </NuxtLink>

          <UiTextDecorator>
            Настройки
          </UiTextDecorator>
          <UiButton @click="changeTheme">
            <div class="theme-button">
              <div
                class="theme-switcher"
                :class="currentTheme"
              >
                <IconsMoon v-if="currentTheme === 'light'"/>
                <IconsSun v-else class="sun-icon"/>
              </div>
              Изменить тему
            </div>
          </UiButton>
          <UiTextDecorator>
            Техподдержка
          </UiTextDecorator>
          <a>
            <IconsMail/>
            Написать в техподдержку
          </a>
          <UiTextDecorator>
            Аккаунт
          </UiTextDecorator>
          <UiButton class="exit-button" secondary>
            <template #before>
              <IconsExit/>
            </template>
            Выйти из аккаунта
          </UiButton>
        </aside>
      </div>
    </Transition>
  </div>
</template>

<style scoped>

.sidebar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  display: flex;
}

.theme-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  color: var(--color-text);
  }

.sidebar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-overlay);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  width: 320px;
  height: 100%;
  background-color: var(--color-modal-bg);
  color: var(--color-text);
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  gap: 12px;
  font-size: 16px;

  a {
    text-decoration: none;
    color: var(--color-text);
    border: 1px solid;
    border-radius: 4px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .theme-button {
    display: flex;
    gap: 12px;
    align-items: center;
    font-size: 16px;
    padding: 8px 4px;
    margin-right: auto;
  }

  .exit-button {
    margin-top: auto;
    display: flex;
    gap: 12px;
  }

  .router-link-active {
    color: var(--color-accent);
    font-weight: 600;
  }
}

.slide-enter-from .sidebar-overlay,
.slide-leave-to .sidebar-overlay {
  opacity: 0;
}

.slide-enter-from .sidebar-content,
.slide-leave-to .sidebar-content {
  transform: translateX(-100%);
}

/* Анимация плавности для вложенных элементов */
.slide-enter-active .sidebar-overlay,
.slide-leave-active .sidebar-overlay {
  transition: opacity 0.3s ease;
}

.slide-enter-active .sidebar-content,
.slide-leave-active .sidebar-content {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>