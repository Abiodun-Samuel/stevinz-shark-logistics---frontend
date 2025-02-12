import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Bootstrap5Pagination } from 'laravel-vue-pagination'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/nprogress/nprogress.css'
import 'vue-skeletor/dist/vue-skeletor.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import '@/assets/css/app.css'
import './assets/main.css'
import Button from '@/components/common/Button.vue'
import Alert from '@/components/common/Alert.vue'
import Icon from '@/components/common/Icon.vue'
import Loader from '@/components/common/Loader.vue'
import Modal from '@/components/common/Modal.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app
  .use(pinia)
  .use(router)
  .component('Button', Button)
  .component('Alert', Alert)
  .component('Pagination', Bootstrap5Pagination)
  .component('Icon', Icon)
  .component('Loader', Loader)
  .component('Modal', Modal)
  .mount('#app')
