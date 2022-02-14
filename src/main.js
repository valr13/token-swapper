import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import '@/styles/app.scss'

createApp(App)
  .use(createPinia())
  .mount('#app')
