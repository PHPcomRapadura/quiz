import { FormFieldProps } from './index.ts'
import { useFormComponent } from './hooks/useFormComponent.ts'

type OptionValue = string | number

export type Option<T extends OptionValue> = {
  value: T
  label: string
}

export type FormSelectProps<T extends OptionValue> = FormFieldProps<T> & {
  options: Option<T>[]
}

export function FormSelect<T extends OptionValue> (props: FormSelectProps<T>) {
  const {
    fieldId,
    fieldName,
    onChange,
    label,
    description,
    fieldValue,
  } = useFormComponent<T>(props)

  const { options } = props

  return (
    <div className="form-row">
      <label
        htmlFor={fieldId}
        className="form-label"
      >
        {label}
      </label>
      <select
        className="form-select"
        id={fieldId}
        name={fieldName}
        value={fieldValue}
        onChange={onChange}
      >
        {
          options.map((option, index) =>
            <option
              key={index}
              value={option.value}
            >
              {option.label}
            </option>
          )
        }
      </select>
      {description && (<small className="form-text text-muted">{description}</small>)}
    </div>
  )
}
