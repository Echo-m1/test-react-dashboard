import { useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function PersonCard() {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleBackClick = useCallback(() => {
    navigate('/people')
  }, [navigate])

  useEffect(() => {
    if (!id?.trim()) {
      navigate('/people', { replace: true })
    }
  }, [id, navigate])

  return (
    <Box
      component="section"
      aria-label="Карточка человека"
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
        aria-label="Вернуться к картотеке"
        sx={{ mb: 2 }}
      >
        Назад к картотеке
      </Button>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
      >
        Карточка человека
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
        >
          Страница карточки человека будет содержать детальную информацию.
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          ID: {id}
        </Typography>
      </Paper>
    </Box>
  )
}

export default PersonCard
