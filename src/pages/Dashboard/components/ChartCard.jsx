import PropTypes from 'prop-types'
import { Card, CardContent, Grid, Typography, useTheme, Box } from '@mui/material'

const CARD_SX = { height: '100%', minHeight: 320, position: 'relative', overflow: 'hidden' }
const CHART_HEIGHT = 280

function ChartCard({ title, gridSize = { xs: 12, md: 6 }, empty, children }) {
  const theme = useTheme()

  return (
    <Grid size={gridSize}>
      <Card
        variant="outlined"
        sx={CARD_SX}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, #020617 60%, #000814 100%)`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: '-10%',
            background:
              'radial-gradient(circle at 120% -10%, rgba(59,130,246,0.45) 0, transparent 55%), radial-gradient(circle at 135% 40%, rgba(147,51,234,0.4) 0, transparent 55%)',
            opacity: 0.7,
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
            variant="subtitle1"
            fontWeight={600}
            gutterBottom
            sx={{ color: theme.palette.primary.light, letterSpacing: 0.2 }}
          >
            {title}
          </Typography>
          {empty ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: CHART_HEIGHT }}
            >
              Нет данных
            </Typography>
          ) : (
            <div style={{ width: '100%', height: CHART_HEIGHT }}>{children}</div>
          )}
        </CardContent>
      </Card>
    </Grid>
  )
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  gridSize: PropTypes.object,
  empty: PropTypes.bool,
  children: PropTypes.node,
}

export default ChartCard
export { CHART_HEIGHT }
