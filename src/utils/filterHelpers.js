import { calculateAge } from './dateUtils'

/**
 * Проверяет, является ли значение валидным (не null, не undefined, не пустая строка)
 * @param {*} value - Значение для проверки
 * @returns {boolean} true, если значение валидно
 */
const isValidFilterValue = (value) => {
  return value != null && value !== ''
}

/**
 * Проверяет, соответствует ли возраст человека фильтру по возрасту
 * @param {number|null} personAge - Возраст человека
 * @param {number|null} ageFrom - Минимальный возраст
 * @param {number|null} ageTo - Максимальный возраст
 * @returns {boolean} true, если возраст соответствует фильтру
 */
const matchesAgeFilter = (personAge, ageFrom, ageTo) => {
  const hasAgeFilter = isValidFilterValue(ageFrom) || isValidFilterValue(ageTo)

  if (personAge === null) {
    return !hasAgeFilter
  }

  if (isValidFilterValue(ageFrom)) {
    const minAge = Number(ageFrom)
    if (!Number.isNaN(minAge) && personAge < minAge) {
      return false
    }
  }

  if (isValidFilterValue(ageTo)) {
    const maxAge = Number(ageTo)
    if (!Number.isNaN(maxAge) && personAge > maxAge) {
      return false
    }
  }

  return true
}

/**
 * Проверяет, соответствует ли город человека фильтру по городу
 * @param {string} personCity - Город человека
 * @param {string} filterCity - Значение фильтра города
 * @returns {boolean} true, если город соответствует фильтру
 */
const matchesCityFilter = (personCity, filterCity) => {
  if (!isValidFilterValue(filterCity)) {
    return true
  }

  const normalizedPersonCity = (personCity || '').toLowerCase()
  const normalizedFilterCity = filterCity.trim().toLowerCase()

  return normalizedPersonCity.includes(normalizedFilterCity)
}

/**
 * Проверяет, соответствует ли пол человека фильтру по полу
 * @param {string} personGender - Пол человека
 * @param {string} filterGender - Значение фильтра пола
 * @returns {boolean} true, если пол соответствует фильтру
 */
const matchesGenderFilter = (personGender, filterGender) => {
  if (!isValidFilterValue(filterGender)) {
    return true
  }

  return personGender === filterGender
}

/**
 * Фильтрует массив людей по заданным критериям
 * @param {Array} people - Массив объектов людей
 * @param {Object} filters - Объект с фильтрами { ageFrom, ageTo, city, gender }
 * @returns {Array} Отфильтрованный массив людей
 */
export const filterPeople = (people, filters) => {
  if (!Array.isArray(people)) {
    return []
  }

  if (!filters || !Object.keys(filters).length) {
    return people
  }

  return people.filter((person) => {
    const personAge = calculateAge(person.birthDate)

    return (
      matchesAgeFilter(personAge, filters.ageFrom, filters.ageTo) &&
      matchesCityFilter(person.city, filters.city) &&
      matchesGenderFilter(person.gender, filters.gender)
    )
  })
}

/**
 * Получает уникальные значения городов из массива людей
 * @param {Array} people - Массив объектов людей
 * @returns {Array} Массив уникальных городов, отсортированный по алфавиту
 */
export const getUniqueCities = (people) => {
  if (!Array.isArray(people)) {
    return []
  }

  const cities = []

  for (const { city } of people) {
    if (!city?.trim()) continue
    cities.push(city.trim())
  }

  return [...new Set(cities)].sort((a, b) => a.localeCompare(b, 'ru'))
}

/**
 * Получает уникальные значения возрастов из массива людей
 * @param {Array} people - Массив объектов людей
 * @returns {Array} Массив уникальных возрастов, отсортированный по возрастанию
 */
export const getUniqueAges = (people) => {
  if (!Array.isArray(people)) {
    return []
  }

  const ages = people.map(({ birthDate }) => calculateAge(birthDate)).filter((age) => age != null)

  return [...new Set(ages)].sort((a, b) => a - b)
}

/**
 * Проверяет, применены ли какие-либо фильтры
 * @param {Object} filters - Объект с фильтрами
 * @returns {boolean} true, если хотя бы один фильтр применён
 */
export const hasActiveFilters = (filters) => {
  if (!filters) {
    return false
  }

  return (
    isValidFilterValue(filters.ageFrom) ||
    isValidFilterValue(filters.ageTo) ||
    isValidFilterValue(filters.city) ||
    isValidFilterValue(filters.gender)
  )
}

/**
 * Сравнивает два значения для сортировки
 * @param {*} aValue - Первое значение
 * @param {*} bValue - Второе значение
 * @returns {number} Результат сравнения (*<0*, 0, *>0*)
 */
const compareValues = (aValue, bValue) => {
  if (aValue == null && bValue == null) {
    return 0
  }
  if (aValue == null) {
    return 1
  }
  if (bValue == null) {
    return -1
  }

  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return aValue - bValue
  }

  if (aValue instanceof Date && bValue instanceof Date) {
    return aValue.getTime() - bValue.getTime()
  }

  if (typeof aValue === 'string' && typeof bValue === 'string') {
    const aDate = new Date(aValue)
    const bDate = new Date(bValue)
    if (!Number.isNaN(aDate.getTime()) && !Number.isNaN(bDate.getTime())) {
      return aDate.getTime() - bDate.getTime()
    }
    return aValue.localeCompare(bValue, 'ru')
  }

  return String(aValue).localeCompare(String(bValue), 'ru')
}

/**
 * Сортирует массив людей по заданному полю
 * @param {Array} people - Массив объектов людей
 * @param {string} field - Поле для сортировки
 * @param {string} direction - Направление сортировки: 'asc' или 'desc'
 * @returns {Array} Отсортированный массив
 */
export const sortPeople = (people, field, direction = 'asc') => {
  if (!Array.isArray(people)) {
    return []
  }

  const sorted = [...people].sort((a, b) => {
    return compareValues(a[field], b[field])
  })

  return direction === 'desc' ? sorted.reverse() : sorted
}
