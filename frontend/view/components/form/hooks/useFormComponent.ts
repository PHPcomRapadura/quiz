import { ChangeEvent, useEffect, useId, useState } from 'react'

import { FormElement, FormFieldProps } from '../index.tsx'

export function useFormComponent<T> (props: FormFieldProps<T>) {
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
  const fieldName: string = name
  const [fieldValue, setFieldValue] = useState<T>(value as T)

  const onChange = (event: ChangeEvent<FormElement>) => {
    const value = event.target.value as T
    setFieldValue(value)
    update && update(fieldName, value)
  }

  useEffect(() => setFieldValue(value as T), [value])

  return {
    fieldId,
    fieldName,
    fieldValue,
    onChange,
    label,
    placeholder,
    description,
  }
}
