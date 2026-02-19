import { Box, Typography, Paper } from '@mui/material'

function PeopleList() {
  return (
    <Box
      component="section"
      aria-label="Картотека"
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
      >
        Картотека
      </Typography>
      <Paper
        component="section"
        sx={{ p: 3, mt: 2 }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
        >
          Страница Картотеки будет содержать список людей с фильтрами и счётчиком.
        </Typography>
      </Paper>
    </Box>
  )
}

export default PeopleList
