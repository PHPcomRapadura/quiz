import { ChangeEvent, useEffect, useId, useState } from 'react'
import { FormFieldProps } from './index.tsx'

type OptionValue = string | number

type Option<T extends OptionValue> = {
  value: T
  label: string
}

export type FormSelectProps<T extends OptionValue> = FormFieldProps & {
  options: Option<T>[]
}
export function FormSelect<T extends OptionValue> (props: FormSelectProps<T>) {
  const {
    id,
    name,
    label,
    options,
    description = '',
    value = '',
    update,
  } = props

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fieldId: string = id ?? useId()

  const [fieldValue, setFieldValue] = useState<T>(value as T)

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as T
    setFieldValue(value)
    update && update(name, value)
  }

  useEffect(() => setFieldValue(value as T), [value])

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
        name={name}
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
