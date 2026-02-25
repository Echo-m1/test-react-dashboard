/**
 * Работа с путями в объектах (например 'passport.series' или 'firstName').
 * Единый источник для get/set по пути в схеме, store и форме.
 */

/**
 * @param {Object} obj - Объект
 * @param {string} pathStr - Путь через точку
 * @returns {*}
 */
export function getByPath(obj, pathStr) {
  if (!pathStr || typeof obj !== 'object' || obj == null) return undefined
  return pathStr.split('.').reduce((acc, key) => acc?.[key], obj)
}

/**
 * Мутирует obj, записывая value по пути. Создаёт вложенные объекты при необходимости.
 * @param {Object} obj - Объект
 * @param {string} pathStr - Путь через точку
 * @param {*} value - Значение
 */
export function setByPath(obj, pathStr, value) {
  if (!pathStr || typeof obj !== 'object' || obj == null) return
  const keys = pathStr.split('.')
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (current[key] == null) current[key] = {}
    current = current[key]
  }
  current[keys.at(-1)] = value
}
