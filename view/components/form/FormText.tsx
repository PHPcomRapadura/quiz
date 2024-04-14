import { FormFieldProps } from './index.tsx'
import { FormInput } from './FormInput.tsx'

export function FormText (props: FormFieldProps) {
  return FormInput({ ...props, type: 'text' })
}
