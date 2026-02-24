import { GENDER_OPTIONS } from '@utils/constants'

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
