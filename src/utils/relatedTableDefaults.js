/**
 * Временный id для новых записей в связанных таблицах (семья, образование, адреса).
 * @returns {string}
 */
export function nextTempId() {
  return `temp-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

/**
 * Пустая запись родственника для формы добавления.
 * @returns {object}
 */
export function getDefaultFamilyMember() {
  return {
    id: nextTempId(),
    relationType: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    phone: '',
    notes: '',
  }
}

/**
 * Пустая запись образования для формы добавления.
 * @returns {object}
 */
export function getDefaultEducation() {
  return {
    id: nextTempId(),
    type: '',
    institution: '',
    faculty: '',
    specialty: '',
    startDate: '',
    endDate: null,
    isCompleted: true,
    diplomaNumber: '',
    notes: '',
  }
}

/**
 * Пустая запись адреса для формы добавления.
 * @returns {object}
 */
export function getDefaultAddress() {
  return {
    id: nextTempId(),
    type: '',
    city: '',
    street: '',
    building: '',
    apartment: '',
    postalCode: '',
    startDate: '',
    endDate: null,
    isCurrent: true,
    notes: '',
  }
}

/**
 * @param {'family'|'education'|'addresses'} arrayKey
 * @returns {object}
 */
export function getDefaultItem(arrayKey) {
  switch (arrayKey) {
    case 'family':
      return getDefaultFamilyMember()
    case 'education':
      return getDefaultEducation()
    case 'addresses':
      return getDefaultAddress()
    default:
      return {}
  }
}
