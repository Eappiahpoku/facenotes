<template>
  <div class="w-full">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block mb-2 text-sm font-medium text-gray-900"
    >
      {{ label }}
      <span v-if="required" class="text-red-600">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Left Icon/Prefix -->
      <div
        v-if="$slots['icon-left'] || prefix"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <slot name="icon-left">
          <span class="text-gray-500">{{ prefix }}</span>
        </slot>
      </div>

      <!-- Input Element -->
      <input
        :id="inputId"
        ref="inputRef"
        v-bind="$attrs"
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder || ''"
        :required="required"
        :disabled="disabled ?? false"
        class="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 shadow-sm text-base min-h-[48px]" :class="[
          { 
            'pl-10': $slots['icon-left'] || prefix,
            'pr-10': $slots['icon-right'] || suffix || showPasswordToggle,
            'bg-gray-50': disabled,
            'cursor-not-allowed': disabled,
            'border-red-300 focus:border-red-500 focus:ring-red-500': error
          }
        ]"
        @input="handleInput"
        @blur="handleBlur"
      >

      <!-- Right Icon/Suffix -->
      <div
        v-if="$slots['icon-right'] || suffix || showPasswordToggle"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <!-- Password Toggle -->
        <button
          v-if="showPasswordToggle"
          type="button"
          class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          @click="togglePassword"
        >
          <span class="sr-only">{{ showPassword ? 'Hide' : 'Show' }} password</span>
          <svg
            class="w-5 h-5"
            :class="{ 'text-primary-500': showPassword }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="showPassword"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              v-if="showPassword"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        </button>

        <!-- Custom Right Icon/Suffix -->
        <slot v-else name="icon-right">
          <span class="text-gray-500">{{ suffix }}</span>
        </slot>
      </div>
    </div>

    <!-- Error Message -->
    <p
      v-if="error"
      class="mt-2 text-sm text-red-600"
      :id="`${inputId}-error`"
    >
      {{ error }}
    </p>

    <!-- Helper Text -->
    <p
      v-else-if="helperText"
      class="mt-2 text-sm text-gray-500"
      :id="`${inputId}-description`"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { uniqueId } from 'lodash'

interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: string
  required: boolean // Changed from optional to required with default
  disabled?: boolean
  error?: string
  helperText?: string
  prefix?: string
  suffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  required: false,
  disabled: false,
  placeholder: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
}>()

// Generate unique ID for input
const inputId = uniqueId('app-input-')
const inputRef = ref<HTMLInputElement | null>(null)

// Password visibility toggle
const showPassword = ref(false)
const showPasswordToggle = computed(() => props.type === 'password')
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

// Event handlers
function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

function togglePassword() {
  showPassword.value = !showPassword.value
}

// Public methods
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<style scoped>
/* High-contrast focus outline for accessibility */
input:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Custom autofill styling */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: inherit !important;
}

/* Improve touch target on mobile */
@media (max-width: 640px) {
  input {
    font-size: 16px; /* Prevent iOS zoom on focus */
  }
}

/* Remove iOS input shadows */
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>