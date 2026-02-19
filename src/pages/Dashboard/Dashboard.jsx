import { useSelector } from 'react-redux'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import { selectDashboardAggregates } from '@store/selectors/dashboardSelectors'

const metricCards = [
  { key: 'total', label: 'Всего записей', getValue: (agg) => agg.totalCount },
  { key: 'male', label: 'Мужчины', getValue: (agg) => agg.countByGender.male },
  { key: 'female', label: 'Женщины', getValue: (agg) => agg.countByGender.female },
  { key: 'requests', label: 'Обработано заявок', getValue: (agg) => agg.requestsApprovedOrCompletedCount },
]

function Dashboard() {
  const aggregates = useSelector(selectDashboardAggregates)

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
        {metricCards.map(({ key, label, getValue }) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
            key={key}
          >
            <Card
              variant="outlined"
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {label}
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  fontWeight={600}
                >
                  {getValue(aggregates)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Dashboard
