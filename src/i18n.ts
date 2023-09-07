import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import en from './locales/en.json'
import zh from './locales/zh-TW.json'

i18n
.use(Backend) // 後端如果回傳多語言設置，得以加載多語言文件
.use(initReactI18next) // React 基礎設置
.init({
    debug: true,
    lng: 'en', // 預設語言
    fallbackLng: 'en', // 載入語言失敗，執行指定語言
    resources: { // 載入目前語言配置
        en,
        zh,
    },
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json', // 加载翻译文件的路径
    },
})

export default i18n;
