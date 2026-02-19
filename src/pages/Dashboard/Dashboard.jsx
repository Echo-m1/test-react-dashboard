import { useSelector } from 'react-redux'
import { Box, Typography, Grid } from '@mui/material'
import { selectDashboardAggregates } from '@store/selectors/dashboardSelectors'
import { useDashboardChartsData } from './hooks/useDashboardChartsData'
import { MetricCards, BirthsByYearChart, GenderDistributionChart, RequestsByStatusChart } from './components'

function Dashboard() {
  const aggregates = useSelector(selectDashboardAggregates)
  const { birthsData, genderData, requestsData } = useDashboardChartsData(aggregates)

  return (
    <Box
      component="section"
      aria-label="Dashboard"
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
      >
        Dashboard
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ mt: 1 }}
      >
        <MetricCards aggregates={aggregates} />
        <BirthsByYearChart data={birthsData} />
        <GenderDistributionChart data={genderData} />
        <RequestsByStatusChart data={requestsData} />
      </Grid>
    </Box>
  )
}

export default Dashboard
