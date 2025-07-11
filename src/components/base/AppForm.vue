<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-full"
    :class="{ 'opacity-75': submitting || offline }"
    novalidate
  >
    <!-- Offline Warning -->
    <div
      v-if="offline && !offlineSubmitEnabled"
      class="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md"
    >
      <p class="text-amber-800 text-sm">
        You are currently offline. Please check your connection and try again.
      </p>
    </div>

    <!-- Form Content -->
    <div :class="{ 'pointer-events-none': submitting }">
      <slot></slot>
    </div>

    <!-- Form Actions -->
    <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
      <!-- Cancel Button -->
      <AppButton
        v-if="showCancel"
        variant="secondary"
        type="button"
        :disabled="submitting"
        :loading="false"
        @click="$emit('cancel')"
      >
        {{ cancelText }}
      </AppButton>

      <!-- Submit Button -->
      <AppButton
        :type="submitButtonType || 'submit'"
        :loading="submitting"
        :disabled="submitting || (offline && !offlineSubmitEnabled)"
        :text="buttonText"
        variant="primary"
      />
    </div>

    <!-- Offline Submit Notice -->
    <div
      v-if="offline && offlineSubmitEnabled"
      class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md"
    >
      <p class="text-blue-800 text-sm">
        Your changes will be saved and synchronized when you're back online.
      </p>
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md"
    >
      <p class="text-red-800 text-sm">{{ errorMessage }}</p>
      <button
        v-if="showRetry"
        @click="handleRetry"
        class="mt-2 text-sm text-red-600 hover:text-red-500"
      >
        Try Again
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNetworkStatus } from '../../composables/useNetworkStatus'
import AppButton from './AppButton.vue'

interface Props {
  submitText?: string
  cancelText?: string
  showCancel?: boolean
  offlineSubmitEnabled?: boolean
  submitButtonType?: 'button' | 'submit'
  showRetry?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Submit',
  cancelText: 'Cancel',
  showCancel: false,
  offlineSubmitEnabled: false,
  submitButtonType: 'submit',
  showRetry: true
})

// Emits for form actions
const emit = defineEmits<{
  (e: 'submit', formData: unknown): void
  (e: 'cancel'): void
  (e: 'retry'): void
}>()

// Network status
const { networkInfo } = useNetworkStatus()
const offline = computed(() => !networkInfo.value.isOnline)

// Form state
const submitting = ref(false)
const errorMessage = ref('')

// Handle form submission
async function handleSubmit(event: Event) {
  const form = event.target as HTMLFormElement
  
  // Reset error state
  errorMessage.value = ''

  // Client-side validation
  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }

  // Prevent multiple submissions
  if (submitting.value) return

  // Check network status
  if (offline.value && !props.offlineSubmitEnabled) {
    errorMessage.value = 'Cannot submit form while offline'
    return
  }

  try {
    submitting.value = true
    
    // Get form data
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    // Emit submit event with form data
    await emit('submit', data)
    
    // Reset form on successful submission
    form.reset()
    
  } catch (error) {
    errorMessage.value = error instanceof Error 
      ? error.message 
      : 'An error occurred. Please try again.'
  } finally {
    submitting.value = false
  }
}

// Handle retry
function handleRetry() {
  errorMessage.value = ''
  emit('retry')
}

const buttonText = computed(() => props.submitText || 'Submit')
</script>

<style scoped>
/* Mobile-optimized focus styles */
form:focus-within {
  outline: none;
  box-shadow: none;
}

/* High contrast validation styles */
input:invalid,
select:invalid,
textarea:invalid {
  border-color: rgb(239, 68, 68);
}

input:invalid:focus,
select:invalid:focus,
textarea:invalid:focus {
  border-color: rgb(239, 68, 68);
  --tw-ring-color: rgb(239, 68, 68);
}

/* Custom validation message styling */
::placeholder {
  color: rgb(156, 163, 175);
}

/* Touch-friendly spacing */
@media (max-width: 640px) {
  input,
  select,
  textarea {
    margin-bottom: 1rem;
  }
}
</style>