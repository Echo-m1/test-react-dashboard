import PropTypes from 'prop-types'
import { TextField, MenuItem, FormControlLabel, Checkbox, FormControl, InputLabel, Select } from '@mui/material'
import { GENDER_OPTIONS, FAMILY_RELATION_TYPES, EDUCATION_TYPES, ADDRESS_TYPES, DOCUMENT_TYPES } from '@utils/constants'
import { getValue } from './personCardUtils'

const OPTIONS_BY_KEY = {
  GENDER_OPTIONS,
  FAMILY_RELATION_TYPES,
  EDUCATION_TYPES,
  ADDRESS_TYPES,
  DOCUMENT_TYPES,
}

function PersonCardField({ person, field }) {
  const value = getValue(person, field.path)
  const id = `field-${field.path.replaceAll('.', '-')}`

  switch (field.type) {
    case 'text':
      return (
        <TextField
          id={id}
          label={field.label}
          value={value ?? ''}
          fullWidth
          size="small"
          slotProps={{
            htmlInput: { 'aria-label': field.label },
            input: { readOnly: true },
          }}
        />
      )
    case 'date':
      return (
        <TextField
          id={id}
          label={field.label}
          type="date"
          value={typeof value === 'string' && value.length >= 10 ? value.slice(0, 10) : ''}
          fullWidth
          size="small"
          slotProps={{
            htmlInput: { 'aria-label': field.label },
            input: { readOnly: true },
            label: { shrink: true },
          }}
        />
      )
    case 'select': {
      const options = field.optionsKey ? (OPTIONS_BY_KEY[field.optionsKey] ?? []) : []
      const option = options.find((o) => o.value === value)
      return (
        <FormControl
          fullWidth
          size="small"
        >
          <InputLabel id={`${id}-label`}>{field.label}</InputLabel>
          <Select
            labelId={`${id}-label`}
            id={id}
            value={value ?? ''}
            label={field.label}
            readOnly
            renderValue={() => option?.label ?? value ?? ''}
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
        </FormControl>
      )
    }
    case 'checkbox':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!value}
              readOnly
              size="small"
              aria-label={field.label}
            />
          }
          label={field.label}
          slotProps={{ input: { 'aria-label': field.label } }}
        />
      )
    case 'textarea':
      return (
        <TextField
          id={id}
          label={field.label}
          value={value ?? ''}
          fullWidth
          size="small"
          multiline
          minRows={2}
          slotProps={{
            htmlInput: { 'aria-label': field.label },
            input: { readOnly: true },
          }}
        />
      )
    default:
      return null
  }
}

PersonCardField.propTypes = {
  person: PropTypes.object.isRequired,
  field: PropTypes.shape({
    path: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    optionsKey: PropTypes.string,
  }).isRequired,
}

export default PersonCardField
