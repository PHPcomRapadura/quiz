import { FormFieldProps } from './index.ts'
import { FormInput } from './FormInput.tsx'

export function FormText (props: FormFieldProps) {
  return FormInput({ ...props, type: 'text' })
}
