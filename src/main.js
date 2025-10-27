import { createApp } from 'vue'
import router from './router/index.js'
import './style.css'
import App from './App.vue'
import 'vue-toastification/dist/index.css';
import Toast from 'vue-toastification';

createApp(App)
.use(router)
.use(Toast)
.mount('#app')
