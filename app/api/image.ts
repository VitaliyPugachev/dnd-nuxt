import type { AxiosResponse } from "axios"
import type { Response } from "~/types/api"
import type { ImageModel } from "~/types/ImageModel"

const addImage = (file: File) => {
  const formData = new FormData()
  formData.append('image', file)
  return api.post<FormData, AxiosResponse<Response<ImageModel>>>('/images', formData)
}

export default {
  addImage
}