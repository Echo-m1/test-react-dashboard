import PropTypes from 'prop-types'
import { Box, TextField } from '@mui/material'

function TextareaFieldInput({
  id,
  field,
  textValue,
  fieldError,
  maxLengthHelper,
  textLength,
  counterInBorderSx,
  handleDebouncedChange,
  flushSync,
}) {
  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        id={id}
        label={field.label}
        value={textValue}
        onChange={(e) => handleDebouncedChange(field.path, e.target.value)}
        onBlur={() => flushSync(field.path, textValue)}
        fullWidth
        size="small"
        multiline
        minRows={2}
        required={field.required}
        error={!!fieldError}
        helperText={fieldError}
        slotProps={{
          htmlInput: {
            'aria-label': field.label,
            ...(field.maxLength != null && { maxLength: field.maxLength }),
          },
        }}
      />
      {maxLengthHelper ? (
        <Box
          component="span"
          sx={{
            ...counterInBorderSx,
            color: textLength >= field.maxLength ? 'error.main' : counterInBorderSx.color,
          }}
          aria-hidden
        >
          {maxLengthHelper}
        </Box>
      ) : null}
    </Box>
  )
}

TextareaFieldInput.displayName = 'TextareaFieldInput'

TextareaFieldInput.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    maxLength: PropTypes.number,
  }).isRequired,
  textValue: PropTypes.string.isRequired,
  fieldError: PropTypes.string,
  maxLengthHelper: PropTypes.string,
  textLength: PropTypes.number.isRequired,
  counterInBorderSx: PropTypes.object.isRequired,
  handleDebouncedChange: PropTypes.func.isRequired,
  flushSync: PropTypes.func.isRequired,
}

export default TextareaFieldInput
