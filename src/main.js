import '@/assets/scss/custom.scss'
import '@/assets/css/styles.min.css'
import '@/assets/css/app.css'
import '@/axios.js'
import "vue-select/dist/vue-select.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'

import vSelect from 'vue-select'

const app = createApp(App)

import jQuery from 'jquery'
window.$ = jQuery

app.use(pinia)
app.use(router)

app.component('v-select', vSelect)

app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'