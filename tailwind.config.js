/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // StudyDock brand colors - Updated color palette
        primary: {
          50: '#E8F5F0',
          100: '#C3E9D7',
          200: '#9DDEBE',
          300: '#76D2A5',
          400: '#4FC68C',
          500: '#2C7865', // Teal Green - Main primary color
          600: '#236550',
          700: '#1A523B',
          800: '#113F26',
          900: '#082C11',
          DEFAULT: '#2C7865'
        },
        accent: {
          50: '#F1F8E9',
          100: '#DCEDC8',
          200: '#C5E1A5',
          300: '#A5D6A7', // Mint Green - Main accent color
          400: '#81C784',
          500: '#66BB6A',
          600: '#4CAF50',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
          DEFAULT: '#A5D6A7'
        },
        background: {
          50: '#FFFFFF',
          100: '#F9FAFB', // Soft White - Main background color
          200: '#F3F4F6',
          300: '#E5E7EB',
          400: '#D1D5DB',
          500: '#9CA3AF',
          600: '#6B7280',
          700: '#4B5563',
          800: '#374151',
          900: '#1F2937',
          DEFAULT: '#F9FAFB'
        },
        text: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937', // Slate Gray - Main text color
          900: '#111827',
          DEFAULT: '#1F2937'
        },
        highlight: {
          50: '#FEF7E6',
          100: '#FDEBC0',
          200: '#FCDD96',
          300: '#FFC971', // Pastel Orange - Main highlight color
          400: '#FFB74D',
          500: '#FFA726',
          600: '#FF9800',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
          DEFAULT: '#FFC971'
        },
        secondary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#6EC1E4', // Sky Blue - Main secondary color
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
          DEFAULT: '#6EC1E4'
        },
        // Keep standard gray scale for consistency
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      },
      // Touch-optimized sizes for Ghanaian mobile users
      spacing: {
        'touch-min': '3rem', // 48px - minimum touch target
        'touch-safe': '4rem' // 64px - comfortable touch area
      },
      borderRadius: {
        studydock: '0.375rem' // Consistent border-radius
      }
    }
  },
  darkMode: 'class', // Enable dark mode
  plugins: [
    require('@tailwindcss/forms') // Add forms plugin
  ]
}
