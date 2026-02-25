import PropTypes from 'prop-types'
import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { useTheme } from '@mui/material'
import { getValue } from './personCardUtils'
import { FIELD_COMPONENTS } from './fields'

const FIELD_TYPES = ['text', 'date', 'select', 'checkbox', 'textarea']

const SYNC_DEBOUNCE_MS = 300

function getInitialLocalValue(fieldType, value) {
  if (fieldType === 'checkbox') return !!value
  if (fieldType === 'date') return typeof value === 'string' && value.length >= 10 ? value.slice(0, 10) : ''
  if (fieldType === 'text' || fieldType === 'textarea' || fieldType === 'select') return value ?? ''
  return undefined
}

/** Приводит локальное значение к формату для сохранения в store (единая точка для cleanup, flush и debounce). */
function formatValueForStore(fieldType, value) {
  if (fieldType === 'checkbox') return !!value
  if (fieldType === 'date') return typeof value === 'string' && value.length >= 10 ? value.slice(0, 10) : ''
  return value ?? ''
}

function PersonCardField({ person, field, fieldError, onFieldChange }) {
  const theme = useTheme()
  const value = getValue(person, field.path)
  const id = `field-${field.path.replaceAll('.', '-')}`
  const [localValue, setLocalValue] = useState(() => getInitialLocalValue(field.type, value))
  const syncTimerRef = useRef(null)
  const localValueRef = useRef(localValue)
  const onFieldChangeRef = useRef(onFieldChange)

  useEffect(() => {
    onFieldChangeRef.current = onFieldChange
  }, [onFieldChange])

  useEffect(() => {
    localValueRef.current = localValue
  }, [localValue])

  useEffect(() => {
    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
      const valueToFlush = formatValueForStore(field.type, localValueRef.current)
      if (typeof onFieldChangeRef.current === 'function') onFieldChangeRef.current(field.path, valueToFlush)
    }
  }, [field.path, field.type])

  const flushSync = useCallback(
    (path, rawValue) => {
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current)
        syncTimerRef.current = null
      }
      const valueToFlush = formatValueForStore(field.type, rawValue)
      if (typeof onFieldChange === 'function') onFieldChange(path, valueToFlush)
    },
    [field.type, onFieldChange]
  )

  const handleDebouncedChange = useCallback(
    (path, newValue) => {
      setLocalValue(newValue)
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
      syncTimerRef.current = setTimeout(() => {
        syncTimerRef.current = null
        const valueToFlush = formatValueForStore(field.type, newValue)
        if (typeof onFieldChange === 'function') onFieldChange(path, valueToFlush)
      }, SYNC_DEBOUNCE_MS)
    },
    [field.type, onFieldChange]
  )

  const dateDisplay = useMemo(
    () => (field.type === 'date' && typeof localValue === 'string' && localValue.length >= 10 ? localValue : ''),
    [field.type, localValue]
  )

  const textValue = localValue ?? ''
  const textLength = textValue.length
  const maxLengthHelper = !fieldError && field.maxLength != null && `${textLength} / ${field.maxLength}`

  const counterInBorderSx = {
    position: 'absolute',
    padding: '2px 4px',
    bottom: 0,
    right: 14,
    px: 0.5,
    bgcolor: 'background.paper',
    borderRadius: 6,
    transform: 'translateY(50%)',
    fontSize: theme.typography.caption.fontSize,
    color: 'text.secondary',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    fontVariantNumeric: 'tabular-nums',
  }

  const FieldComponent = FIELD_COMPONENTS[field.type]
  if (!FieldComponent) return null

  return (
    <FieldComponent
      id={id}
      field={field}
      localValue={localValue}
      textValue={textValue}
      dateDisplay={dateDisplay}
      fieldError={fieldError}
      maxLengthHelper={maxLengthHelper}
      textLength={textLength}
      counterInBorderSx={counterInBorderSx}
      handleDebouncedChange={handleDebouncedChange}
      flushSync={flushSync}
    />
  )
}

PersonCardField.displayName = 'PersonCardField'

PersonCardField.propTypes = {
  person: PropTypes.object.isRequired,
  field: PropTypes.shape({
    path: PropTypes.string.isRequired,
    type: PropTypes.oneOf(FIELD_TYPES).isRequired,
    label: PropTypes.string.isRequired,
    optionsKey: PropTypes.string,
    required: PropTypes.bool,
    maxLength: PropTypes.number,
  }).isRequired,
  fieldError: PropTypes.string,
  onFieldChange: PropTypes.func,
}

export default PersonCardField
