import { Box, Typography, Paper } from '@mui/material'

function Dashboard() {
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
      <Paper
        component="section"
        sx={{ p: 3, mt: 2 }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
        >
          Страница Dashboard будет содержать графики и метрики.
        </Typography>
      </Paper>
    </Box>
  )
}

export default Dashboard
