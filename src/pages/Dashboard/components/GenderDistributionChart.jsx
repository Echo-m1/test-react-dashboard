import PropTypes from 'prop-types'
import { useTheme } from '@mui/material'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ChartCard, { CHART_HEIGHT } from './ChartCard'

function GenderDistributionChart({ data }) {
  const theme = useTheme()
  const gridColor = theme.palette.divider
  const textColor = theme.palette.common.white
  const isEmpty = !data?.length

  return (
    <ChartCard
      title="Распределение по полу"
      gridSize={{ xs: 12, md: 4, lg: 4 }}
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
              backgroundColor: '#020617',
              border: `1px solid ${gridColor}`,
              fontSize: 14,
              color: textColor,
              boxShadow: '0 16px 40px rgba(15,23,42,0.9)',
              borderRadius: 8,
            }}
            itemStyle={{ color: textColor }}
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
