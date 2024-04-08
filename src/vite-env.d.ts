/// <reference types="vite/client" />

declare module 'markdown' {
  let markdown: {
    toHTML (markdown: string): string;
  }
}
