/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
