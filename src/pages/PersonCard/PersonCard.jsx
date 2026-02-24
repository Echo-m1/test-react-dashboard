import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Button, Tabs, Tab, Grid } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useSelector } from 'react-redux'
import { selectPersonById } from '@store/selectors'
import { PERSON_CARD_TABS } from './personCardConfig'

function getPersonTitle(person) {
  if (!person) return ''
  const parts = [person.lastName, person.firstName, person.middleName].filter(Boolean)
  return parts.length ? parts.join(' ') : `Карточка #${person.id}`
}

function PersonCard() {
  const { id } = useParams()
  const navigate = useNavigate()
  const person = useSelector((state) => selectPersonById(state, id))
  const [tabIndex, setTabIndex] = useState(0)

  const handleBackClick = useCallback(() => {
    navigate('/people')
  }, [navigate])

  const handleTabChange = useCallback((_, newValue) => {
    setTabIndex(newValue)
  }, [])

  useEffect(() => {
    if (!id?.trim()) {
      navigate('/people', { replace: true })
    }
  }, [id, navigate])

  if (!id?.trim()) {
    return null
  }

  if (!person) {
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
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="body1"
            color="text.secondary"
          >
            Человек с указанным ID не найден.
          </Typography>
        </Paper>
      </Box>
    )
  }

  const title = getPersonTitle(person)
  const currentTab = PERSON_CARD_TABS[tabIndex]

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
        {title}
      </Typography>
      <Paper sx={{ mt: 2, overflow: 'hidden' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Разделы карточки"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: 1,
          }}
        >
          {PERSON_CARD_TABS.map((tab, index) => (
            <Tab
              key={tab.id}
              id={`person-tab-${index}`}
              aria-controls={`person-tabpanel-${index}`}
              label={tab.label}
            />
          ))}
        </Tabs>
        <Box
          component="form"
          noValidate
          sx={{ p: 3 }}
          aria-labelledby={`person-tab-${tabIndex}`}
          id={`person-tabpanel-${tabIndex}`}
          role="tabpanel"
        >
          <Grid
            container
            spacing={3}
            sx={{ flexDirection: 'column' }}
          >
            {currentTab.sections.map((section) => (
              <Grid
                size={{ xs: 12 }}
                key={section.id}
              >
                <Box
                  component="section"
                  aria-labelledby={`section-${section.id}`}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography
                    id={`section-${section.id}`}
                    variant="subtitle1"
                    component="h2"
                    fontWeight={600}
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    {section.title}
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                  >
                    <Grid size={{ xs: 12, sm: 6 }} />
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

export default PersonCard
