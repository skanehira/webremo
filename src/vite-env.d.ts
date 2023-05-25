/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENDPOINT: string
  readonly TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
