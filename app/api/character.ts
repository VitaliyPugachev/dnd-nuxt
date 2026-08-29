import type { AxiosResponse } from "axios";
import type { Response } from "~/types/api";
import type { CharacterModel } from "~/types/CharacterModel";

const createCharacter = (data: CharacterModel) => {
  return api.post<CharacterModel, AxiosResponse<Response<CharacterModel>>>('/characters', data)
}

export default {
  createCharacter
}