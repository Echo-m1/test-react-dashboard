import PropTypes from 'prop-types'
import { useTheme } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard, { CHART_HEIGHT } from './ChartCard'

function BirthsByYearChart({ data }) {
  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const gridColor = theme.palette.divider
  const isEmpty = !data?.length

  return (
    <ChartCard
      title="Рождения по годам"
      gridSize={{ xs: 12, md: 6 }}
      empty={isEmpty}
    >
      <ResponsiveContainer
        width="100%"
        height={CHART_HEIGHT}
      >
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
          />
          <XAxis
            dataKey="year"
            tick={{ fill: textColor, fontSize: 14 }}
          />
          <YAxis tick={{ fill: textColor, fontSize: 14 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${gridColor}`,
            }}
            labelStyle={{ color: textColor }}
          />
          <Bar
            dataKey="count"
            fill={theme.palette.primary.main}
            name="Человек"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

BirthsByYearChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

export default BirthsByYearChart
