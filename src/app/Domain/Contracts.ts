export enum Status {
  success = 'success',
  error = 'error',
  fail = 'fail'
}

export interface Content {
  status: Status
  data?: Data | string | null
  message?: string
}

export type Data = { [property: string]: Data | unknown }
