<script lang="ts" setup>
import authApi from '@/api/auth'

// const {init, getInitData} = useTelegram()
const isAcceptPolicy = ref(false)
const isAuthLoading = ref(false)
const { setAuthData } = useAuth()
const { isInitApp } = storeToRefs(useAuth())
const router = useRouter()

const auth = async () => {
  try {
    isAuthLoading.value = true
    // init()
    // const initData = getInitData()
    const response = await authApi.authByTelegram("auth_date=1787000000&query_id=AAH_b3wBAAAAAP9vfAEnwP2r&user=%7B%22id%22%3A987654321%2C%22first_name%22%3A%22%D0%98%D0%B2%D0%B0%D0%BD%22%2C%22last_name%22%3A%22%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%22%2C%22username%22%3A%22test_user%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&hash=8cb9d6f30a9051fb87a98eb3bc2bfbe05d04588506da3d5402919be64c483a04")
    
    if (!response.data) {
      throw new Error('Authorization error')
    }

    setAuthData(response.data)
    isInitApp.value = true
    router.push('/')

  } catch (error) {
    console.error(error)
  } finally {
    isAuthLoading.value = false
  }
}

</script>

<template>
  <main class="auth">
    <div class="policy">
      <input v-model="isAcceptPolicy" class="checkbox" type="checkbox"/>
      <span class="policy-text">
      Я ознакомлен с
      <a class="policy-link" target="_blank" href="src/assets/policy.docx">
        Политикой конфиденциальности
      </a>
      и согласен на обработку персональных данных
    </span>
    </div>

    <UiButton
      label="Войти через telegram"
      :disabled="!isAcceptPolicy"
      :loading="isAuthLoading"
      @click="auth"
    >
      <template #before>
        <IconsTelegram/>
      </template>
    </UiButton>
  </main>
</template>

<style lang="scss" scoped>
.auth {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 24px;
  height: 90svh;

  & .policy {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  & .checkbox {
    width: 32px;
    height: 32px;
  }

  & .policy-text {
    font-size: 16px;
  }

  & .policy-link {
    color: var(--color-accent);
  }
}
</style>
