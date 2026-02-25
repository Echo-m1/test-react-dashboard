import PropTypes from 'prop-types'
import { Grid, Card, CardContent, Typography, useTheme, Box } from '@mui/material'

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
  const theme = useTheme()

  const gradients = [
    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.secondary.light})`,
    `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
    `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
  ]

  return (
    <>
      {METRIC_CARDS.map(({ key, label, getValue }, index) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 3 }}
          key={key}
        >
          <Card
            sx={{
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              background: gradients[index % gradients.length],
              color: 'common.white',
              boxShadow: '0 18px 45px rgba(15,23,42,0.45)',
              border: 'none',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                opacity: 0.18,
                background:
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.8) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(15,23,42,0.9) 0, transparent 55%)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: '-20%',
                opacity: 0.42,
                background:
                  'radial-gradient(circle at 120% -10%, rgba(15,23,42,0.65) 0, transparent 55%), radial-gradient(circle at 150% 40%, rgba(11,16,32,0.8) 0, transparent 55%)',
                mixBlendMode: 'screen',
              }}
            />
            <CardContent
              sx={{
                position: 'relative',
                zIndex: 1,
                px: 2.5,
                py: 2.25,
              }}
            >
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  color: 'rgba(255,255,255,0.86)',
                  fontWeight: 500,
                  letterSpacing: 0.4,
                  textTransform: 'uppercase',
                  fontSize: 12,
                }}
              >
                {label}
              </Typography>
              <Typography
                variant="h4"
                component="p"
                fontWeight={600}
                sx={{ lineHeight: 1.1 }}
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
