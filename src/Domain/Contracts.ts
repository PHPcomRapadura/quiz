export enum Status {
  success = 'success',
  error = 'error',
  fail = 'fail'
}

export interface Content {
  status: Status
  data?: Data
  message?: string
}

export type Data = Record<string, unknown>
