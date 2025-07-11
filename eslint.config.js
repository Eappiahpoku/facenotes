import { fileURLToPath } from 'node:url'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: '.',
        extraFileExtensions: ['.vue'],
        vueFeatures: {
          filter: true,
          interpolationAsNonHTML: false,
          styleCSSVariableInjection: true
        }
      },
      globals: {
        window: true,
        navigator: true,
        document: true,
        setTimeout: true,
        clearTimeout: true,
        setInterval: true,
        clearInterval: true,
        console: true,
        localStorage: true,
        sessionStorage: true,
        FormData: true,
        Promise: true
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      vue
    },
    rules: {
      // Ghana-specific guidelines
      'max-len': ['error', { code: 100 }], // For mobile-first development
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Minimize console usage
      'no-undef': 'off', // Handled by TypeScript

      // Vue specific rules
      'vue/multi-word-component-names': 'error',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/define-macros-order': ['error', { order: ['defineProps', 'defineEmits'] }],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/html-button-has-type': 'warn', // Downgraded to warning for now
      'vue/no-unused-refs': 'error',
      'vue/padding-line-between-blocks': 'error',
      'vue/prefer-separate-static-class': 'warn', // Downgraded to warning for now

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'warn', // Downgraded to warning
      '@typescript-eslint/no-unused-expressions': 'warn' // Downgraded to warning
    },

    ignores: ['dist/**', 'node_modules/**']
  },
  eslintConfigPrettier
)
