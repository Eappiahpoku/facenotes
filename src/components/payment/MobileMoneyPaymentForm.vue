<template>
  <div class="mobile-money-form">
    <!-- Network Status Warning -->
    <div v-if="!networkInfo.isOnline" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            You are currently offline. Your payment will be queued and processed when you're back online.
          </p>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Amount Input -->
      <div>
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount (GHS)</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">₵</span>
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            v-model="amount"
            class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>
      </div>

      <!-- Provider Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Select Provider</label>
        <div class="mt-1 grid grid-cols-3 gap-3">
          <template v-for="provider in providers" :key="provider">
            <div
              class="flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors hover:border-primary-300 hover:bg-primary-50"
              :class="{
                'border-primary-500 bg-primary-50 ring-2 ring-primary-500': selectedProvider === provider
              }"
              @click="selectedProvider = provider"
            >
              <img
                :src="getProviderLogo(provider)"
                :alt="provider"
                class="h-8 w-auto mx-auto"
              />
              <span class="mt-1 block text-xs">{{ provider }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- Phone Number Input -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
        <div class="mt-1">
          <input
            type="tel"
            name="phone"
            id="phone"
            v-model="phoneNumber"
            class="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="024 XXX XXXX"
            required
            @input="validatePhone"
          />
          <p v-if="phoneError" class="mt-1 text-sm text-red-600">{{ phoneError }}</p>
        </div>
      </div>

      <!-- USSD Code Display -->
      <div v-if="ussdCode" class="p-4 bg-gray-50 rounded-md">
        <p class="text-sm font-medium text-gray-700">USSD Code:</p>
        <div class="mt-1 flex items-center">
          <code class="text-lg font-mono bg-white px-2 py-1 rounded border">{{ ussdCode }}</code>
          <button
            type="button"
            class="ml-2 text-primary-600 hover:text-primary-700"
            @click="copyUSSDCode"
          >
            Copy
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="!isValid || processing"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400"
      >
        <svg
          v-if="processing"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ processing ? 'Processing...' : 'Pay Now' }}
      </button>
    </form>

    <!-- Status Messages -->
    <transition name="fade">
      <div v-if="statusMessage" :class="statusClasses" class="mt-4 p-4 rounded-md">
        {{ statusMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMobileMoneyPayment } from '../../composables/useMobileMoneyPayment'
import { useNetworkStatus } from '../../composables/useNetworkStatus'
import type { MobileMoneyProvider } from '../../composables/useMobileMoneyPayment'

const { networkInfo } = useNetworkStatus()
const { 
  initializePayment, 
  validatePhoneNumber,
  getUSSDCode 
} = useMobileMoneyPayment()

const providers: MobileMoneyProvider[] = ['MTN', 'VODAFONE', 'AIRTELTIGO']
const amount = ref('')
const selectedProvider = ref<MobileMoneyProvider>('MTN')
const phoneNumber = ref('')
const phoneError = ref('')
const processing = ref(false)
const statusMessage = ref('')
const statusType = ref<'success' | 'error' | 'info'>('info')

// Computed properties
const isValid = computed(() => 
  amount.value && 
  selectedProvider.value && 
  phoneNumber.value && 
  !phoneError.value
)

const ussdCode = computed(() => 
  amount.value && selectedProvider.value
    ? getUSSDCode(selectedProvider.value, Number(amount.value))
    : ''
)

const statusClasses = computed(() => ({
  'bg-green-50 text-green-800': statusType.value === 'success',
  'bg-red-50 text-red-800': statusType.value === 'error',
  'bg-blue-50 text-blue-800': statusType.value === 'info'
}))

// Methods
const validatePhone = () => {
  if (!phoneNumber.value) {
    phoneError.value = ''
    return
  }
  
  if (!validatePhoneNumber(phoneNumber.value)) {
    phoneError.value = 'Please enter a valid Ghana phone number (e.g., 024 XXX XXXX)'
  } else {
    phoneError.value = ''
  }
}

const handleSubmit = async () => {
  if (!isValid.value) return

  processing.value = true
  statusMessage.value = ''

  try {
    const result = await initializePayment(
      Number(amount.value),
      selectedProvider.value,
      phoneNumber.value,
      'Payment for services'
    )

    if (result.success) {
      statusType.value = 'success'
      statusMessage.value = result.message
      if (result.status === 'offline-queued') {
        statusType.value = 'info'
      }
    } else {
      statusType.value = 'error'
      statusMessage.value = result.message
    }
  } catch (error) {
    statusType.value = 'error'
    statusMessage.value = 'An error occurred while processing your payment. Please try again.'
  } finally {
    processing.value = false
  }
}

const getProviderLogo = (provider: MobileMoneyProvider): string => {
  // Replace with actual logo URLs
  return `/images/providers/${provider.toLowerCase()}.png`
}

const copyUSSDCode = async () => {
  if (ussdCode.value) {
    try {
      await navigator.clipboard.writeText(ussdCode.value)
      statusType.value = 'success'
      statusMessage.value = 'USSD code copied to clipboard!'
    } catch (err) {
      statusType.value = 'error'
      statusMessage.value = 'Failed to copy USSD code'
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
