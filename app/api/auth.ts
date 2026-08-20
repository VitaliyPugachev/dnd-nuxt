import api from '@/utils/api.ts'

export const authByTelegram = (initData: string) => {
  if (!initData) return  Promise.reject()

  return api.post('/auth/telegram', { initData }, {headers: {"Content-Type": "application/json"}})
}
