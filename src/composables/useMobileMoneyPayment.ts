import { ref } from 'vue'
import { useOfflineStorage } from './useOfflineStorage'
import { useNetworkStatus } from './useNetworkStatus'

export type MobileMoneyProvider = 'MTN' | 'VODAFONE' | 'AIRTELTIGO'
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'offline-queued'

export interface MobileMoneyPayment {
  id: string
  amount: number
  currency: string
  provider: MobileMoneyProvider
  phoneNumber: string
  description: string
  status: PaymentStatus
  timestamp: number
  reference?: string
}

export interface PaymentResult {
  success: boolean
  status: PaymentStatus
  message: string
  reference?: string
}

export function useMobileMoneyPayment() {
  const { networkInfo } = useNetworkStatus()
  const { saveData } = useOfflineStorage()
  
  const currentPayment = ref<MobileMoneyPayment | null>(null)
  const processingPayment = ref(false)

  // Provider-specific configurations
  const PROVIDER_CONFIGS = {
    MTN: {
      validateNumber: (phone: string) => /^024|054|055|059\d{7}$/.test(phone),
      maxAmount: 10000,
      minAmount: 1,
      processingFee: (amount: number) => amount * 0.01, // 1% fee
      merchantId: import.meta.env.VITE_MTN_MERCHANT_ID
    },
    VODAFONE: {
      validateNumber: (phone: string) => /^020|050\d{7}$/.test(phone),
      maxAmount: 5000,
      minAmount: 1,
      processingFee: (amount: number) => amount * 0.015, // 1.5% fee
      merchantId: import.meta.env.VITE_VODAFONE_MERCHANT_ID
    },
    AIRTELTIGO: {
      validateNumber: (phone: string) => /^027|057\d{7}$/.test(phone),
      maxAmount: 5000,
      minAmount: 1,
      processingFee: (amount: number) => amount * 0.0125, // 1.25% fee
      merchantId: import.meta.env.VITE_AIRTELTIGO_MERCHANT_ID
    }
  }

  // Validate Ghana phone number
  const validatePhoneNumber = (phone: string): boolean => {
    // Ghana phone number format: 0[2,5][0,4-9]xxxxxxx
    const ghanaPhone = /^0([23]0|[25][0,4-9])\d{7}$/
    return ghanaPhone.test(phone)
  }

  // Format phone number to standard Ghana format
  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `+233${cleaned.slice(1)}`
    }
    return phone
  }

  // Validate amount for provider
  const validateAmount = (amount: number, provider: MobileMoneyProvider): boolean => {
    const config = PROVIDER_CONFIGS[provider]
    return amount >= config.minAmount && amount <= config.maxAmount
  }

  // Calculate total amount including fees
  const calculateTotalWithFees = (amount: number, provider: MobileMoneyProvider): number => {
    const fee = PROVIDER_CONFIGS[provider].processingFee(amount)
    return amount + fee
  }

  // Validate provider-specific phone number
  const validateProviderNumber = (phone: string, provider: MobileMoneyProvider): boolean => {
    return PROVIDER_CONFIGS[provider].validateNumber(phone)
  }

  // Initialize payment
  const initializePayment = async (
    amount: number,
    provider: MobileMoneyProvider,
    phoneNumber: string,
    description: string
  ): Promise<PaymentResult> => {
    if (!validatePhoneNumber(phoneNumber)) {
      return {
        success: false,
        status: 'failed',
        message: 'Invalid phone number format. Please use a valid Ghana phone number.'
      }
    }

    const payment: MobileMoneyPayment = {
      id: crypto.randomUUID(),
      amount,
      currency: 'GHS',
      provider,
      phoneNumber: formatPhoneNumber(phoneNumber),
      description,
      status: 'pending',
      timestamp: Date.now()
    }

    currentPayment.value = payment

    // If offline, queue the payment
    if (!networkInfo.value.isOnline) {
      await saveData('pendingPayments', payment, 'create')
      return {
        success: true,
        status: 'offline-queued',
        message: 'Payment has been queued and will be processed when online.'
      }
    }

    return processProviderPayment(payment)
  }

  // Process provider-specific payment
  const processProviderPayment = async (payment: MobileMoneyPayment): Promise<PaymentResult> => {
    const config = PROVIDER_CONFIGS[payment.provider]
    
    // Validate amount limits
    if (!validateAmount(payment.amount, payment.provider)) {
      return {
        success: false,
        status: 'failed',
        message: `Amount must be between GHS ${config.minAmount} and GHS ${config.maxAmount}`
      }
    }

    // Validate provider-specific phone number
    if (!validateProviderNumber(payment.phoneNumber, payment.provider)) {
      return {
        success: false,
        status: 'failed',
        message: `Invalid ${payment.provider} phone number format`
      }
    }

    try {
      // Here you would integrate with the actual provider API
      // This is where you'd use the merchantId and other provider-specific details
      const totalAmount = calculateTotalWithFees(payment.amount, payment.provider)
      
      // Add provider-specific payment details
      const paymentDetails = {
        ...payment,
        merchantId: config.merchantId,
        totalAmount,
        fee: totalAmount - payment.amount
      }

      return processPayment(paymentDetails)
    } catch (error) {
      return {
        success: false,
        status: 'failed',
        message: error instanceof Error ? error.message : 'Provider payment processing failed'
      }
    }
  }

  // Process payment with provider
  const processPayment = async (payment: MobileMoneyPayment): Promise<PaymentResult> => {
    processingPayment.value = true

    try {
      // Here you would integrate with actual payment providers
      // This is a placeholder for demonstration
      const response = await mockProviderAPI(payment)
      
      if (response.success) {
        payment.status = 'completed'
        payment.reference = response.reference
        return {
          success: true,
          status: 'completed',
          message: 'Payment processed successfully.',
          reference: response.reference
        }
      }

      payment.status = 'failed'
      return {
        success: false,
        status: 'failed',
        message: 'Payment processing failed. Please try again.'
      }
    } catch (error) {
      payment.status = 'failed'
      return {
        success: false,
        status: 'failed',
        message: error instanceof Error ? error.message : 'Payment processing failed.'
      }
    } finally {
      processingPayment.value = false
    }
  }

  // Mock provider API (replace with actual provider integration)
  const mockProviderAPI = async (payment: MobileMoneyPayment): Promise<{ success: boolean; reference: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
    return {
      success: true,
      reference: `${payment.provider}-${Date.now()}`
    }
  }

  // Get USSD code for manual payment
  const getUSSDCode = (provider: MobileMoneyProvider, amount: number): string => {
    const formattedAmount = amount.toFixed(2)
    switch (provider) {
      case 'MTN':
        return `*170*1*${formattedAmount}#` // Send money to merchant
      case 'VODAFONE':
        return `*110*1*${formattedAmount}#` // Vodafone cash payment
      case 'AIRTELTIGO':
        return `*500*1*${formattedAmount}#` // AirtelTigo money payment
      default:
        return ''
    }
  }

  return {
    // State
    currentPayment,
    processingPayment,

    // Core payment functions
    initializePayment,
    processProviderPayment,

    // Validation functions
    validatePhoneNumber,
    validateProviderNumber,
    validateAmount,
    formatPhoneNumber,

    // Utility functions
    getUSSDCode,
    calculateTotalWithFees,

    // Provider configurations
    PROVIDER_CONFIGS
  }
}
