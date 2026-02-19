import { createSelector } from '@reduxjs/toolkit'
import { filterPeople } from '@utils/filterHelpers'

export const selectPeopleState = (state) => state.people
export const selectPeopleItems = (state) => state.people?.items ?? []
export const selectSelectedId = (state) => state.people?.selectedId ?? null
export const selectFiltersState = (state) => state.filters

export const selectSelectedPerson = createSelector([selectPeopleItems, selectSelectedId], (items, selectedId) => {
  if (!selectedId) return null
  return items.find((p) => p.id === selectedId) ?? null
})

export const selectFilteredPeople = createSelector([selectPeopleItems, selectFiltersState], (items, filters) =>
  filterPeople(items, filters)
)

export const selectFilteredCount = createSelector([selectFilteredPeople], (filtered) => filtered.length)
