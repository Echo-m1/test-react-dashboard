import PropTypes from 'prop-types'
import { useTheme } from '@mui/material'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ChartCard, { CHART_HEIGHT } from './ChartCard'

function GenderDistributionChart({ data }) {
  const theme = useTheme()
  const gridColor = theme.palette.divider
  const isEmpty = !data?.length

  return (
    <ChartCard
      title="Распределение по полу"
      gridSize={{ xs: 12, md: 6 }}
      empty={isEmpty}
    >
      <ResponsiveContainer
        width="100%"
        height={CHART_HEIGHT}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${gridColor}`,
              fontSize: 14,
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

GenderDistributionChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

export default GenderDistributionChart
