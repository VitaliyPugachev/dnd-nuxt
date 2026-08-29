<script setup lang="ts">
import { reactive } from 'vue'
import { useNotificationStore } from '@/stores/notification.ts'
import AppLoader from '@/components/ui/AppLoader.vue'
import { POPUP_TEXT } from '@/constants/InfoText'
import imageApi from '@/api/image'

const {showNotification} = useNotificationStore()

const imageId = defineModel<string>()

interface PreviewData {
  image: string,
  loading: boolean,
  error: boolean,
  link: string,
}

const preview = reactive<PreviewData>({
  image: '',
  loading: false,
  link: '',
  error: false
})

const getImage = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files?.[0]) return;

  const file: File = input.files[0]
  if (!file) return
  if (file.size > 1024 * 1024 * 5) return showNotification('Размер загружаемого файла превышает максимальный', 3000, 'error')
  const reader = new FileReader()

  reader.onload = () => {
    preview.image = reader.result as string
  }
  reader.readAsDataURL(file)

  sendFileToServer(file)
}

const sendFileToServer = async (file: File) => {
  if (!file) return;

  preview.loading = true
  preview.error = false

  try {
    
    const { data } = await imageApi.addImage(file)    

    if (!data.success || !data.data?.url) {
      showNotification('Не удалось загрузить изображение', 3000, 'error');
      throw new Error()
    }

    preview.link = data.data.url
    imageId.value = data.data.id
  } catch (e) {
    preview.error = true
    console.error(e)
  } finally {
    preview.loading = false
  }
}

const deleteImage = () => {
  preview.image = '';
  preview.link = ''
  preview.error = false
  imageId.value = ''
}
</script>

<template>
  <label class="photo-uploader" for="photo-input">
    <input
      id="photo-input"
      type="file"
      class="photo-uploader__input"
      hidden
      accept="image/*"
      @change="getImage"
    >
    <div class="photo-uploader__image-wrapper">
      <UiButton
        v-if="preview.image && !preview.error && !preview.loading"
        class="photo-uploader__close-button"
        borderless
        @click="deleteImage"
      >
        <IconsClose/>
      </UiButton>
      <div v-if="preview.loading" class="photo-uploader__loader">
        <AppLoader/>
      </div>
      <img v-if="preview.image && !preview.error" :src="preview.image" class="photo-uploader__photo">
      <img v-else class="photo-uploader__photo" src="/images/profile_photo.webp">
    </div>
    <div class="photo-uploader__icon">
      <IconsCamera v-if="!preview.image" class="photo-uploader__svg"/>
      <IconsEdit v-else class="photo-uploader__svg"/>
    </div>
    <UiInfoPopup @click.prevent :text="POPUP_TEXT.uploadPhoto" class="photo-uploader__popup"/>
  </label>
</template>

<style lang="scss" scoped>
.photo-uploader {
  width: 200px;
  height: 200px;
  border: 6px double var(--color-secondary);
  border-radius: 12px;
  position: relative;

  &:hover {
    box-shadow: 0 0 20px var(--color-progress);
  }

  &__image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__photo {
    width: 100%;
    object-fit: cover;
  }

  &__input {
    position: absolute;
    inset: 0;
  }

  &__icon {
    position: absolute;
    left: calc(50% - 20px);
    bottom: -20px;
    width: 40px;
    height: 40px;
    background: var(--color-secondary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__svg {
    color: var(--color-accent-secondary);
  }

  &__close-button {
    position: absolute;
    right: 2px;
    top: 2px;
    background: #B83232;
    color: white;
    border-radius: 50%;
    padding: 8px;
  }

  &__loader {
    position: absolute;
    inset: 0;
    background: #000000;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__popup {
    position: absolute;
    right: -48px;
    bottom: 0px;
  }
}
</style>
