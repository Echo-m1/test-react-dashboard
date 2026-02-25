/**
 * Форматирует дату в формат DD.MM.YYYY
 * @param {string|Date} date - Дата в формате ISO строки или Date объект
 * @returns {string} Отформатированная дата или пустая строка, если дата невалидна
 */
export const formatDate = (date) => {
  if (!date) {
    return ''
  }

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date

    if (Number.isNaN(dateObj.getTime())) {
      return ''
    }

    const day = String(dateObj.getDate()).padStart(2, '0')
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const year = dateObj.getFullYear()

    return `${day}.${month}.${year}`
  } catch (error) {
    console.warn('Ошибка форматирования даты:', error)
    return ''
  }
}

/**
 * Вычисляет возраст по дате рождения
 * @param {string|Date} birthDate - Дата рождения в формате ISO строки или Date объект
 * @returns {number|null} Возраст в годах или null, если дата невалидна
 */
export const calculateAge = (birthDate) => {
  if (!birthDate) {
    return null
  }

  try {
    const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate

    if (Number.isNaN(birth.getTime())) {
      return null
    }

    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    if (age < 0) {
      return null
    }

    return age
  } catch (error) {
    console.warn('Ошибка вычисления возраста:', error)
    return null
  }
}

/**
 * Парсит строку даты в формате DD.MM.YYYY в Date объект
 * @param {string} dateString - Дата в формате DD.MM.YYYY
 * @returns {Date|null} Date объект или null, если строка невалидна
 */
export const parseDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return null
  }

  const parts = dateString.split('.')
  if (parts.length !== 3) {
    return null
  }

  const day = Number.parseInt(parts[0], 10)
  const month = Number.parseInt(parts[1], 10) - 1
  const year = Number.parseInt(parts[2], 10)

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return null
  }

  const date = new Date(year, month, day)
  if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
    return null
  }

  return date
}

/**
 * Проверяет, является ли значение валидной датой
 * @param {string|Date} date - Дата для проверки
 * @returns {boolean} true, если дата валидна
 */
export const isValidDate = (date) => {
  if (!date) {
    return false
  }

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return !Number.isNaN(dateObj.getTime())
  } catch {
    return false
  }
}

/**
 * Форматирует дату для input[type="date"] (YYYY-MM-DD)
 * @param {string|Date} date - Дата в формате ISO строки или Date объект
 * @returns {string} Дата в формате YYYY-MM-DD или пустая строка
 */
export const formatDateForInput = (date) => {
  if (!date) {
    return ''
  }

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date

    if (Number.isNaN(dateObj.getTime())) {
      return ''
    }

    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  } catch (error) {
    console.warn('Ошибка форматирования даты для input:', error)
    return ''
  }
}
