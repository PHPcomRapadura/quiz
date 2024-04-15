import { FormFieldProps } from './index.ts'
import { FormInput } from './FormInput.tsx'

export function FormPassword (props: FormFieldProps) {
  return FormInput({ ...props, type: 'password' })
}
