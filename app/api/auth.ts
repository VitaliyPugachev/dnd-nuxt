import api from '@/utils/api.ts'
import type { AxiosResponse } from 'axios'
import type { Response } from '~/types/api'
import type { User } from '~/types/user'

let refreshPromise: Promise<Response<undefined>> | null = null

const authByTelegram = (initData: string) => {
  if (!initData) return  Promise.reject()

  return api.post<{initData: string}, AxiosResponse<User>>(
    '/auth/telegram', 
    { initData }, 
    {headers: {"Content-Type": "application/json"}}
  )
}

const refresh = () => {
  if (!refreshPromise) {
    refreshPromise = api.post<undefined, Response<undefined>>('auth/refresh')
    .finally(() => {
      refreshPromise = null
    })
  }
  
  return refreshPromise
}

export default {
  authByTelegram,
  refresh
}
