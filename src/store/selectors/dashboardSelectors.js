import { createSelector } from '@reduxjs/toolkit'
import { selectPeopleItems } from '@store/selectors/peopleSelectors'

export const selectTotalCount = createSelector([selectPeopleItems], (items) => items.length)

export const selectCountByGender = createSelector([selectPeopleItems], (items) => {
  const byGender = { male: 0, female: 0 }
  for (const p of items) {
    if (p.gender === 'male') byGender.male += 1
    else if (p.gender === 'female') byGender.female += 1
  }
  return byGender
})

/**
 * Количество рождений по годам. Объект с ключами-годами, порядок ключей отсортирован по возрастанию года
 * (удобно для графиков «рождения по годам»).
 */
export const selectBirthsByYear = createSelector([selectPeopleItems], (items) => {
  const byYear = {}
  for (const p of items) {
    if (p.birthDate == null) continue
    const year = String(p.birthDate).slice(0, 4)
    if (year.length < 4) continue
    byYear[year] = (byYear[year] ?? 0) + 1
  }
  const sortedYears = Object.keys(byYear).sort((a, b) => Number(a) - Number(b))
  const ordered = {}
  for (const y of sortedYears) ordered[y] = byYear[y]
  return ordered
})

/**
 * Количество заявок в статусах «одобрено» или «завершено» (успешно обработанные).
 * Статусы pending и rejected не учитываются.
 */
export const selectRequestsApprovedOrCompletedCount = createSelector([selectPeopleItems], (items) => {
  let count = 0
  for (const p of items) {
    const requests = p.requests ?? []
    for (const r of requests) {
      if (r.status === 'completed' || r.status === 'approved') count += 1
    }
  }
  return count
})

export const selectDashboardAggregates = createSelector(
  [selectTotalCount, selectCountByGender, selectBirthsByYear, selectRequestsApprovedOrCompletedCount],
  (totalCount, countByGender, birthsByYear, requestsApprovedOrCompletedCount) => ({
    totalCount,
    countByGender,
    birthsByYear,
    requestsApprovedOrCompletedCount,
  })
)
