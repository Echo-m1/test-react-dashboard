import { useCallback } from 'react'
import { useTheme } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts'
import ChartCard, { CHART_HEIGHT } from './ChartCard'

function RequestsByStatusChart({ data }) {
  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const gridColor = theme.palette.divider
  const isEmpty = !data?.length

  const barShape = useCallback(
    (props) => {
      const fill = data[props.index]?.fill ?? theme.palette.primary.main
      return (
        <Rectangle
          {...props}
          fill={fill}
        />
      )
    },
    [data, theme.palette.primary.main]
  )

  return (
    <ChartCard
      title="Заявки по статусам"
      gridSize={{ xs: 12 }}
      empty={isEmpty}
    >
      <ResponsiveContainer
        width="100%"
        height={CHART_HEIGHT}
      >
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 24, left: 80, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
          />
          <XAxis
            type="number"
            tick={{ fill: textColor, fontSize: 14 }}
          />
          <YAxis
            type="category"
            dataKey="status"
            width={72}
            tick={{ fill: textColor, fontSize: 14 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${gridColor}`,
            }}
          />
          <Bar
            dataKey="count"
            name="Заявок"
            radius={[0, 4, 4, 0]}
            shape={barShape}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export default RequestsByStatusChart
