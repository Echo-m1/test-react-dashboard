/**
 * Формирует заголовок карточки (ФИО или «Карточка #id»).
 * @param {Object|null} person - Объект человека
 * @returns {string}
 */
export function getPersonTitle(person) {
  if (!person) return ''
  const parts = [person.lastName, person.firstName, person.middleName].filter(Boolean)
  return parts.length ? parts.join(' ') : `Карточка #${person.id}`
}

/**
 * Возвращает значение из объекта по пути вида 'passport.series' или 'firstName'.
 * @param {Object} obj - Объект (person)
 * @param {string} path - Путь к полю
 * @returns {*} Значение или пустая строка для отображения
 */
export function getValue(obj, path) {
  if (!obj || !path) return ''
  const keys = path.split('.')
  let value = obj
  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) return ''
  }
  if (value === null || value === undefined) return ''
  return value
}
