import React from 'react'
import { Typography, Button, Box } from '@mui/material'

function App() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        color="primary"
        gutterBottom
      >
        Кадры / Техподдержка
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        Обвязка приложения: MUI тема и провайдер подключены.
      </Typography>
      <Button
        variant="contained"
        color="primary"
      >
        Проверка темы
      </Button>
    </Box>
  )
}

export default App
