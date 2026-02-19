import { useMemo } from 'react'
import { useTheme } from '@mui/material'
import { REQUEST_STATUSES } from '@utils/constants'

/**
 * Подготавливает данные для графиков дэшборда. Результат мемоизирован по aggregates.
 * @param {import('@store/selectors/dashboardSelectors').DashboardAggregates} aggregates
 * @returns {{ birthsData: Array<{year: string, count: number}>, genderData: Array<{name: string, value: number, fill: string}>, requestsData: Array<{status: string, count: number, fill: string}> }}
 */
export function useDashboardChartsData(aggregates) {
  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const secondaryMain = theme.palette.secondary.main
  const warningMain = theme.palette.warning.main
  const successMain = theme.palette.success.main
  const errorMain = theme.palette.error.main

  return useMemo(() => {
    const birthsData = Object.entries(aggregates?.birthsByYear ?? {}).map(([year, count]) => ({
      year,
      count,
    }))

    const genderColors = [primaryMain, secondaryMain]
    const countByGender = aggregates?.countByGender ?? {}
    const genderData = [
      { name: 'Мужчины', value: countByGender.male ?? 0, fill: genderColors[0] },
      { name: 'Женщины', value: countByGender.female ?? 0, fill: genderColors[1] },
    ].filter((d) => d.value > 0)

    const statusLabels = Object.fromEntries(REQUEST_STATUSES.map((s) => [s.value, s.label]))
    const statusColors = {
      pending: warningMain,
      approved: successMain,
      rejected: errorMain,
      completed: primaryMain,
    }
    const requestsData = Object.entries(aggregates?.requestsByStatus ?? {}).map(([status, count]) => ({
      status: statusLabels[status] ?? status,
      count,
      fill: statusColors[status],
    }))

    return { birthsData, genderData, requestsData }
  }, [aggregates, primaryMain, secondaryMain, warningMain, successMain, errorMain])
}
