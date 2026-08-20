import { messages } from '~/i18n/locales'

export type MessageModel = typeof messages.ru | typeof messages.en
export type Locales = keyof typeof messages
