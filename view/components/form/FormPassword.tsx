import { FormFieldProps } from './index.tsx'
import { FormInput } from './FormInput.tsx'

export function FormPassword (props: FormFieldProps) {
  return FormInput({ ...props, type: 'password' })
}
