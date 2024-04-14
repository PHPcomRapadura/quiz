export type FormValueUpdate = (fieldName: string, value: unknown) => void

export type FormValueWatchCallback = (current: unknown, previous: unknown) => void

export type FormValueWatch = (fieldName: string, callback: FormValueWatchCallback) => void

export type FormFieldProps = {
  id?: string
  name: string
  label: string
  value?: unknown
  description?: string
  placeholder?: string
  update?: FormValueUpdate
}

export type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
