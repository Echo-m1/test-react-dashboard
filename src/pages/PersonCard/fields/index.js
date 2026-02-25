export { default as TextFieldInput } from './TextFieldInput'
export { default as DateFieldInput } from './DateFieldInput'
export { default as SelectFieldInput } from './SelectFieldInput'
export { default as CheckboxFieldInput } from './CheckboxFieldInput'
export { default as TextareaFieldInput } from './TextareaFieldInput'

import TextFieldInput from './TextFieldInput'
import DateFieldInput from './DateFieldInput'
import SelectFieldInput from './SelectFieldInput'
import CheckboxFieldInput from './CheckboxFieldInput'
import TextareaFieldInput from './TextareaFieldInput'

export const FIELD_COMPONENTS = {
  text: TextFieldInput,
  date: DateFieldInput,
  select: SelectFieldInput,
  checkbox: CheckboxFieldInput,
  textarea: TextareaFieldInput,
}
