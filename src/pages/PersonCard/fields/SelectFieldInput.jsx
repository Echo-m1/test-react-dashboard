import PropTypes from 'prop-types'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { OPTIONS_BY_KEY } from '@utils/constants'

function SelectFieldInput({ id, field, localValue, fieldError, handleDebouncedChange, flushSync }) {
  const options =
    field.optionsKey && Object.hasOwn(OPTIONS_BY_KEY, field.optionsKey) ? OPTIONS_BY_KEY[field.optionsKey] : []
  const option = options.find((o) => o.value === localValue)
  const isRelatedEdit = id.startsWith('related-edit-')

  if (isRelatedEdit) {
    return (
      <TextField
        select
        id={id}
        label={field.label}
        value={localValue ?? ''}
        onChange={(e) => handleDebouncedChange(field.path, e.target.value)}
        onBlur={() => flushSync(field.path, localValue ?? '')}
        fullWidth
        size="small"
        required={field.required}
        error={!!fieldError}
        helperText={fieldError}
        slotProps={{
          htmlInput: { 'aria-label': field.label },
          label: { shrink: true },
          select: {
            displayEmpty: true,
            renderValue: () => option?.label ?? localValue ?? '',
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    )
  }

  return (
    <FormControl
      fullWidth
      size="small"
      required={field.required}
      error={!!fieldError}
    >
      <InputLabel
        id={`${id}-label`}
        required={field.required}
      >
        {field.label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={localValue ?? ''}
        label={field.label}
        onChange={(e) => handleDebouncedChange(field.path, e.target.value)}
        onClose={() => flushSync(field.path, localValue ?? '')}
        renderValue={() => option?.label ?? localValue ?? ''}
        displayEmpty
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {fieldError ? <FormHelperText>{fieldError}</FormHelperText> : null}
    </FormControl>
  )
}

SelectFieldInput.displayName = 'SelectFieldInput'

SelectFieldInput.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    optionsKey: PropTypes.string,
  }).isRequired,
  localValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  fieldError: PropTypes.string,
  handleDebouncedChange: PropTypes.func.isRequired,
  flushSync: PropTypes.func.isRequired,
}

export default SelectFieldInput
