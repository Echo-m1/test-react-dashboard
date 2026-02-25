import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Button, Tabs, Tab, Grid, Alert, Snackbar } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useSelector, useDispatch } from 'react-redux'
import { selectPersonById } from '@store/selectors'
import { setPerson } from '@store/slices/peopleSlice'
import { validatePerson } from '@utils/personSchema'
import { getByPath, setByPath } from '@utils/objectPath'
import { PERSON_CARD_TABS } from './personCardConfig'
import { getPersonTitle } from './personCardUtils'
import PersonCardSection from './PersonCardSection'

function PersonCard() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const person = useSelector((state) => selectPersonById(state, id))
  const [tabIndex, setTabIndex] = useState(0)
  const [draft, setDraft] = useState(null)
  const [resetKey, setResetKey] = useState(0)
  const [saveSuccessOpen, setSaveSuccessOpen] = useState(false)
  const [noChangesOpen, setNoChangesOpen] = useState(false)
  const formStateRef = useRef(null)

  useEffect(() => {
    formStateRef.current = draft ?? person
  }, [draft, person])

  useEffect(() => {
    if (person?.id == null) return
    let cancelled = false
    const t = setTimeout(() => {
      if (!cancelled) {
        setDraft(null)
        setResetKey((k) => k + 1)
      }
    }, 0)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [person?.id])

  const formPerson = draft ?? person
  const fieldErrors = useMemo(() => {
    if (!formPerson) return {}
    const result = validatePerson(formPerson)
    return result.success ? {} : result.errors
  }, [formPerson])

  const handleFieldChange = useCallback(
    (path, value) => {
      if (!person?.id) return
      const source = draft ?? person
      const current = getByPath(source, path)
      if (current === value) return
      const next = structuredClone(source)
      setByPath(next, path, value)
      setDraft(next)
    },
    [person, draft]
  )

  const handleSave = useCallback(() => {
    if (!person?.id) return
    if (!draft) {
      setNoChangesOpen(true)
      return
    }
    // Сбрасываем фокус, чтобы активное поле вызвало onBlur (flush) и обновило draft до сохранения
    if (typeof document !== 'undefined' && document.activeElement?.blur) {
      document.activeElement.blur()
    }
    const flushDelayMs = 100
    setTimeout(() => {
      const latest = formStateRef.current
      if (!latest) return
      const result = validatePerson(latest)
      if (!result.success) return
      // Сохраняем нормализованные данные (trim, приведённые типы из Zod), а не сырой ввод
      dispatch(setPerson(result.data))
      setDraft(null)
      setResetKey((k) => k + 1)
      setSaveSuccessOpen(true)
    }, flushDelayMs)
  }, [dispatch, person?.id, draft])

  const handleCloseSaveSuccess = useCallback(() => setSaveSuccessOpen(false), [])
  const handleCloseNoChanges = useCallback(() => setNoChangesOpen(false), [])

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
  const hasValidationErrors = Object.keys(fieldErrors).length > 0
  const saveButtonAriaLabel = hasValidationErrors ? 'Исправьте ошибки для сохранения' : 'Сохранить'

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
            direction="column"
          >
            {currentTab.sections.map((section) => (
              <Grid
                size={{ xs: 12 }}
                key={section.id}
              >
                <PersonCardSection
                  section={section}
                  person={formPerson}
                  personId={person?.id}
                  resetKey={resetKey}
                  fieldErrors={fieldErrors}
                  onFieldChange={handleFieldChange}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            {hasValidationErrors ? (
              <Alert
                severity="error"
                sx={{ flex: '1 1 auto', minWidth: 0 }}
                role="alert"
                aria-live="polite"
              >
                Исправьте ошибки в полях формы перед сохранением.
              </Alert>
            ) : null}
            <Button
              type="button"
              variant="contained"
              disabled={hasValidationErrors}
              aria-disabled={hasValidationErrors}
              aria-label={saveButtonAriaLabel}
              onClick={handleSave}
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={saveSuccessOpen}
        autoHideDuration={4000}
        onClose={handleCloseSaveSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        aria-live="polite"
        aria-label="Данные сохранены"
      >
        <Alert
          onClose={handleCloseSaveSuccess}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Данные сохранены
        </Alert>
      </Snackbar>
      <Snackbar
        open={noChangesOpen}
        autoHideDuration={4000}
        onClose={handleCloseNoChanges}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        aria-live="polite"
        aria-label="Нет изменений для сохранения"
      >
        <Alert
          onClose={handleCloseNoChanges}
          severity="info"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Нет изменений для сохранения
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default PersonCard
