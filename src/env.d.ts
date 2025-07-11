/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MTN_MERCHANT_ID: string
  readonly VITE_VODAFONE_MERCHANT_ID: string
  readonly VITE_AIRTELTIGO_MERCHANT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
