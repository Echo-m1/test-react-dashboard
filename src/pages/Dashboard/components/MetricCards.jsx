import PropTypes from 'prop-types'
import { Grid, Card, CardContent, Typography } from '@mui/material'

const METRIC_CARDS = [
  { key: 'total', label: 'Всего записей', getValue: (agg) => agg?.totalCount ?? 0 },
  { key: 'male', label: 'Мужчины', getValue: (agg) => agg?.countByGender?.male ?? 0 },
  { key: 'female', label: 'Женщины', getValue: (agg) => agg?.countByGender?.female ?? 0 },
  {
    key: 'requests',
    label: 'Обработано заявок',
    getValue: (agg) => agg?.requestsApprovedOrCompletedCount ?? 0,
  },
]

function MetricCards({ aggregates }) {
  return (
    <>
      {METRIC_CARDS.map(({ key, label, getValue }) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 3 }}
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
    </>
  )
}

MetricCards.propTypes = {
  aggregates: PropTypes.object,
}

export default MetricCards
