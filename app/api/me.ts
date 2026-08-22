import type { User } from "@/types/user"

const getMe = () => {
  return api.get<User>('/me')
}

export default {
  getMe
}