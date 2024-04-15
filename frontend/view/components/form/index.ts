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

export { useFormValue } from './hooks/useFormValue.ts'
export { Form } from './Form.tsx'
export { FormPassword } from './FormPassword.tsx'
export { FormText } from './FormText.tsx'
export { FormSelect } from './FormSelect.tsx'
