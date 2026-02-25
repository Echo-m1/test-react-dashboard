import { createSelector } from '@reduxjs/toolkit'
import { filterPeople } from '@utils/filterHelpers'

export const selectPeopleState = (state) => state.people
export const selectPeopleItems = (state) => state.people?.items ?? []
export const selectPeopleInitialized = (state) => state.people?.initialized ?? false
export const selectSelectedId = (state) => state.people?.selectedId ?? null
export const selectFiltersState = (state) => state.filters

export const selectSelectedPerson = createSelector([selectPeopleItems, selectSelectedId], (items, selectedId) => {
  if (!selectedId) return null
  return items.find((p) => p.id === selectedId) ?? null
})

/**
 * Возвращает человека по id из store (для карточки по маршруту /person/:id).
 * @param {Object} state - Redux state
 * @param {string|null|undefined} id - id из useParams()
 * @returns {Object|null} человек или null
 */
export function selectPersonById(state, id) {
  if (!id) return null
  const items = selectPeopleItems(state)
  return items.find((p) => p.id === id) ?? null
}

export const selectFilteredPeople = createSelector([selectPeopleItems, selectFiltersState], (items, filters) =>
  filterPeople(items, filters)
)

export const selectFilteredCount = createSelector([selectFilteredPeople], (filtered) => filtered.length)
