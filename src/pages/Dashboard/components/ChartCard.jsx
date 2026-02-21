import { Card, CardContent, Grid, Typography } from '@mui/material'

const CARD_SX = { height: '100%', minHeight: 320 }
const CHART_HEIGHT = 280

function ChartCard({ title, gridSize = { xs: 12, md: 6 }, empty, children }) {
  return (
    <Grid size={gridSize}>
      <Card
        variant="outlined"
        sx={CARD_SX}
      >
        <CardContent>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            gutterBottom
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

export default ChartCard
export { CHART_HEIGHT }
