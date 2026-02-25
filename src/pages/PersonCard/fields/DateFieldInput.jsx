import PropTypes from 'prop-types'
import { TextField } from '@mui/material'

function DateFieldInput({ id, field, dateDisplay, localValue, fieldError, handleDebouncedChange, flushSync }) {
  return (
    <TextField
      id={id}
      label={field.label}
      type="date"
      value={dateDisplay}
      onChange={(e) => handleDebouncedChange(field.path, e.target.value)}
      onBlur={() => flushSync(field.path, localValue)}
      fullWidth
      size="small"
      required={field.required}
      error={!!fieldError}
      helperText={fieldError}
      slotProps={{
        htmlInput: { 'aria-label': field.label },
        inputLabel: { shrink: true, sx: { maxWidth: 'calc(100% - 2.5rem)' } },
      }}
    />
  )
}

DateFieldInput.displayName = 'DateFieldInput'

DateFieldInput.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
  }).isRequired,
  dateDisplay: PropTypes.string.isRequired,
  localValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  fieldError: PropTypes.string,
  handleDebouncedChange: PropTypes.func.isRequired,
  flushSync: PropTypes.func.isRequired,
}

export default DateFieldInput
