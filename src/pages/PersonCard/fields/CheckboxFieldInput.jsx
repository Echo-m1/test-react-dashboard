import PropTypes from 'prop-types'
import { Box, Checkbox, FormControlLabel, FormHelperText } from '@mui/material'

function CheckboxFieldInput({ field, localValue, fieldError, handleDebouncedChange, flushSync }) {
  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!localValue}
            onChange={(e) => handleDebouncedChange(field.path, e.target.checked)}
            onBlur={() => flushSync(field.path, !!localValue)}
            size="small"
            aria-label={field.label}
          />
        }
        label={field.label}
      />
      {fieldError ? (
        <FormHelperText
          error
          sx={{ mt: 0.5 }}
        >
          {fieldError}
        </FormHelperText>
      ) : null}
    </Box>
  )
}

CheckboxFieldInput.displayName = 'CheckboxFieldInput'

CheckboxFieldInput.propTypes = {
  field: PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  localValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  fieldError: PropTypes.string,
  handleDebouncedChange: PropTypes.func.isRequired,
  flushSync: PropTypes.func.isRequired,
}

export default CheckboxFieldInput
