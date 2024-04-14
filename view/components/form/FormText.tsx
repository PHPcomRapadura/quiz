import { FormFieldProps } from './index.tsx'
import { useFormComponent } from './hooks/useFormComponent.ts'

export function FormText (props: FormFieldProps) {
  const {
    fieldId,
    fieldName,
    onChange,
    label,
    placeholder,
    description,
    fieldValue,
  } = useFormComponent<string>(props)

  return (
    <div className="form-row">
      <label
        htmlFor={fieldId}
        className="form-label"
      >
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        id={fieldId}
        name={fieldName}
        placeholder={placeholder}
        value={fieldValue}
        onChange={onChange}
      />
      {description && (<small className="form-text text-muted">{description}</small>)}
    </div>
  )
}
