import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Button, Tabs, Tab, Grid } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useSelector } from 'react-redux'
import { selectPersonById } from '@store/selectors'
import { PERSON_CARD_TABS } from './personCardConfig'
import { getPersonTitle } from './personCardUtils'
import PersonCardSection from './PersonCardSection'

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
          sx={{ borderBottom: 1, borderColor: 'divider', px: 1 }}
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
                <PersonCardSection
                  section={section}
                  person={person}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

export default PersonCard
