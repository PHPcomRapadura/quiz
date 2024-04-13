import { ChangeEvent, useEffect, useId, useState } from 'react'
import { FormFieldProps } from './index.tsx'

export type FormTextProps = FormFieldProps & {
  placeholder?: string
}

export function FormText (props: FormTextProps) {
  const {
    id,
    name,
    label,
    placeholder = '',
    description = '',
    value = '',
    update,
  } = props

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fieldId: string = id ?? useId()

  const [fieldValue, setFieldValue] = useState<string>(String(value))

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = String(event.target.value)
    setFieldValue(value)
    update && update(name, value)
  }

  useEffect(() => setFieldValue(value as string), [value])

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
        name={name}
        placeholder={placeholder}
        value={fieldValue}
        onChange={onChange}
      />
      {description && (<small className="form-text text-muted">{description}</small>)}
    </div>
  )
}
