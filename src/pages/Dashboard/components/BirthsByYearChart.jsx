import PropTypes from 'prop-types'
import { useTheme } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard, { CHART_HEIGHT } from './ChartCard'

function BirthsByYearChart({ data }) {
  const theme = useTheme()
  const textColor = theme.palette.common.white
  const gridColor = theme.palette.divider
  const isEmpty = !data?.length

  return (
    <ChartCard
      title="Рождения по годам"
      gridSize={{ xs: 12, md: 8, lg: 8 }}
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
          <defs>
            <linearGradient
              id="birthsGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={theme.palette.secondary.light}
                stopOpacity={0.95}
              />
              <stop
                offset="50%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.9}
              />
              <stop
                offset="100%"
                stopColor="#4c1d95"
                stopOpacity={0.8}
              />
            </linearGradient>
          </defs>
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
              backgroundColor: '#020617',
              border: `1px solid ${gridColor}`,
              borderRadius: 8,
              boxShadow: '0 16px 40px rgba(15,23,42,0.9)',
              fontSize: 14,
            }}
            labelStyle={{ color: textColor }}
          />
          <Bar
            dataKey="count"
            fill="url(#birthsGradient)"
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
