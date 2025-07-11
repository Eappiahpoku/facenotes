import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './style.css'
import { FontAwesomeIcon } from './plugins/fontawesome.ts'
import '@fortawesome/fontawesome-svg-core/styles.css' 
import Toast, { toastOptions } from './plugins/toast.ts'
import 'vue-toastification/dist/index.css'

// Import Vercel Analytics for pageview/event tracking
import { inject } from "@vercel/analytics"


// Import base components
import AppButton from './components/base/AppButton.vue'
import AppForm from './components/base/AppForm.vue'
import AppInput from './components/base/AppInput.vue'
import ErrorBoundary from '././components/system/ErrorBoundary.vue'
import LoadingSpinner from './components/base/LoadingSpinner.vue'
import OfflineIndicator from './components/base/OfflineIndicator.vue'

// Create Vue application
const app = createApp(App)

// Configure Pinia with persistence
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Register base components globally
app.component('AppButton', AppButton)
app.component('AppForm', AppForm)
app.component('AppInput', AppInput)
app.component('ErrorBoundary', ErrorBoundary)
app.component('LoadingSpinner', LoadingSpinner)
app.component('OfflineIndicator', OfflineIndicator)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(Toast, toastOptions)



// Use plugins
app.use(pinia)
app.use(router)

// Initialize Vercel Analytics (tracks pageviews automatically)
inject();


// Mount the app
app.mount('#app')
