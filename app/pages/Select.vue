<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

import { useRouter } from 'vue-router'
import type { CharacterModel } from '@/types/CharacterModel.ts'
import CharacterCard from '@/components/ui/CharacterCard.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification.ts'
import ModalComponent from '@/components/widgets/ModalComponent.vue'
import charactersApi from '@/api/character'

const router = useRouter()
const loading = ref(false);
const deleteLoading = ref(false);
const { user, isAuth } = storeToRefs(useAuth());
const {showNotification} = useNotificationStore();

const isDeleteModalOpen = ref(false);
const selectedCharacter = ref<CharacterModel | null>(null);

const charactersList = ref<CharacterModel[]>([]);

const getALlCharacters = async () => {
  if (!isAuth.value) {
    showNotification('Для получения списка персанажей необходимо авторизоваться в telegram', 3000, 'error');
    return
  }

  loading.value = true;

  try {
    const { data } = await charactersApi.getCharacters()

    if (!data) {
      throw new Error('Не удалось получить данные')
    }

    charactersList.value = data.data || []
  } catch (e) {
    showNotification(String(e), 3000, 'error')
  } finally {
    loading.value = false;
  }
}

const onDeleteClick = (character?: CharacterModel) => {
  if (!character) return;
  selectedCharacter.value = character
  isDeleteModalOpen.value = true;
}

const onDelete = async () => {
  deleteLoading.value = true;

  const { error } = await supabase
    .from('Character')
    .delete()
    .eq('id', selectedCharacter.value?.id);

  if (!error) {
    showNotification('Персонаж успешно удален', 3000);
    selectedCharacter.value = null;
    isDeleteModalOpen.value = false;
    await getALlCharacters();
  }
  deleteLoading.value = false;
}

onMounted(() => {
  getALlCharacters()
})
</script>

<template>
  <div class="select-page">
    <header class="select-page__header">
      <UiButton class="select-page__back" small @click="router.push('/')">
        <IconssBack/>
      </UiButton>
      <h2 class="select-page__title">Выбор персонажа</h2>
    </header>
    <AppLoader v-if="loading"/>
    <div class="select-page__empty" v-else-if="!loading && !charactersList.length">
      <span class="select-page__empty-label">
        У вас нет добавленных персонажей
      </span>
      <UiButton primary label="Добавить" @click="router.push('/create')"/>
    </div>
    <template v-else>
      <section class="select-page__list">
        <template v-for="item in charactersList" :key="item.id">
          <CharacterCard
            :character="item"
            @on-delete="onDeleteClick"
            @on-select="router.push(`/${item.id}`)"
          />
        </template>
      </section>
    </template>
    <ModalComponent
      :visible="isDeleteModalOpen"
      @close="isDeleteModalOpen = false"
    >
      <div class="modal-content">
        <UiButton
          class="modal-content__close-button"
          clear-background
          small
          borderless
          @click="isDeleteModalOpen = false"
        >
          <IconssClose/>
        </UiButton>
        <p class="modal-content__text">Вы уверены, что хотите удалить персонажа?</p>
        <div class="modal-content__buttons">
          <UiButton label="Отмена" @click="isDeleteModalOpen = false"/>
          <UiButton :loading="deleteLoading" primary label="Удалить" @click="onDelete"/>
        </div>
      </div>
    </ModalComponent>
  </div>
</template>

<style lang="scss" scoped>
.select-page {
  color: var(--color-text);
  &__header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__empty {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
  }

  &__empty-label {
    font-size: 18px;
    font-weight: 500;
  }
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--color-main);

  &__close-button {
    align-self: end;
    margin-top: -14px;
  }

  &__text {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 10px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 4px;

    & > button {
      flex: 1 0;
    }
  }
}
</style>
