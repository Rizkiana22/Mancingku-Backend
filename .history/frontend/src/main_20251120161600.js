import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/blog.css'
import axios from "axios"

// SET BASE URL SERVER BACKEND
axios.defaults.baseURL = "http://localhost:3000"

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(router)
app.mount('#app')
