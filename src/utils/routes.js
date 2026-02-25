/**
 * Константы маршрутов приложения.
 * Использовать для path в Route, Link, navigate() и т.д.
 */

export const ROUTES = {
  DASHBOARD: '/',
  PEOPLE: '/people',
  person: (id) => (id == null ? '/person/:id' : `/person/${id}`),
}
