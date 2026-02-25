import {
  GENDER_OPTIONS,
  FAMILY_RELATION_TYPES,
  EDUCATION_TYPES,
  ADDRESS_TYPES,
  DOCUMENT_TYPES,
  REQUEST_STATUSES,
} from '@utils/constants'

const OPTIONS_BY_KEY = {
  GENDER_OPTIONS,
  FAMILY_RELATION_TYPES,
  EDUCATION_TYPES,
  ADDRESS_TYPES,
  DOCUMENT_TYPES,
  REQUEST_STATUSES,
}

/**
 * Возвращает подпись пола по значению из GENDER_OPTIONS
 * @param {string} value - Значение пола (male, female и т.д.)
 * @returns {string} Подпись для отображения или исходное значение
 */
export function getGenderLabel(value) {
  if (!value) return ''
  const option = GENDER_OPTIONS.find((o) => o.value === value)
  return option ? option.label : String(value)
}

/**
 * Возвращает подпись опции по optionsKey и значению
 * @param {string} optionsKey - Ключ в constants (FAMILY_RELATION_TYPES, EDUCATION_TYPES и т.д.)
 * @param {string} value - Значение
 * @returns {string}
 */
export function getOptionLabel(optionsKey, value) {
  if (!value) return ''
  const options = OPTIONS_BY_KEY[optionsKey]
  if (!Array.isArray(options)) return String(value)
  const option = options.find((o) => o.value === value)
  return option ? option.label : String(value)
}
