export function base (): string {
  return import.meta.env.VITE_BASE_PATH || '/'
}

export function image (path: string): string {
  return (base() + '/assets/images/' + path).replace(/([^:]\/)\/+/g, '$1')
}
