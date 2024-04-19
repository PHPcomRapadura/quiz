import { FormFieldProps } from './index.ts'
import { useFormComponent } from './hooks/useFormComponent.ts'

type FormInputProps<T> = FormFieldProps<T> & { type?: string }

export function FormInput<T> (props: FormInputProps<T>) {
  const {
    fieldId,
    fieldName,
    onChange,
    label,
    placeholder,
    description,
    fieldValue,
  } = useFormComponent<T>(props)

  const { type = 'text' } = props

  return (
    <div className="form-row">
      <label
        htmlFor={fieldId}
        className="form-label"
      >
        {label}
      </label>
      <input
        className="form-control"
        type={type}
        id={fieldId}
        name={fieldName}
        placeholder={placeholder}
        value={fieldValue as string | number}
        onChange={onChange}
      />
      {description && (<small className="form-text text-muted">{description}</small>)}
    </div>
  )
}
