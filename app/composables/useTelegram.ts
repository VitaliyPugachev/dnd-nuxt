export const useTelegram = () => {
  const webApp = window.Telegram.WebApp

  const init = () => {
    webApp.ready()
    webApp.expand()
  }

  const getInitData = () => {
    return webApp.initData
  }

  return {
    init,
    getInitData,
  }
}
