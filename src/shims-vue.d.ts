/**
 * Global shim for importing .vue files in TypeScript.
 * This allows TypeScript to recognize .vue SFCs as valid modules.
 * Required for all Vue 3 + TypeScript projects.
 */

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}