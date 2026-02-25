import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Paper, Typography } from '@mui/material'
import {
  setAgeFromFilter,
  setAgeToFilter,
  setCityFilter,
  setGenderFilter,
  resetFilters,
} from '@store/slices/filtersSlice'
import { selectPeopleItems, selectFiltersState } from '@store/selectors'
import { getUniqueCities, hasActiveFilters } from '@utils/filterHelpers'
import { GENDER_OPTIONS } from '@utils/constants'

function PeopleFilters({ onFiltersChange }) {
  const dispatch = useDispatch()
  const filters = useSelector(selectFiltersState)
  const allPeople = useSelector(selectPeopleItems)

  const cityOptions = useMemo(() => getUniqueCities(allPeople), [allPeople])

  const notifyChange = useCallback(() => {
    onFiltersChange?.()
  }, [onFiltersChange])

  const handleAgeFromChange = useCallback(
    (e) => {
      const v = e.target.value
      if (v === '') {
        dispatch(setAgeFromFilter(null))
        notifyChange()
        return
      }
      const num = Number(v)
      if (Number.isNaN(num)) {
        dispatch(setAgeFromFilter(null))
        notifyChange()
        return
      }
      const age = Math.floor(num)
      dispatch(age >= 0 && age <= 150 ? setAgeFromFilter(age) : setAgeFromFilter(null))
      notifyChange()
    },
    [dispatch, notifyChange]
  )

  const handleAgeToChange = useCallback(
    (e) => {
      const v = e.target.value
      if (v === '') {
        dispatch(setAgeToFilter(null))
        notifyChange()
        return
      }
      const num = Number(v)
      if (Number.isNaN(num)) {
        dispatch(setAgeToFilter(null))
        notifyChange()
        return
      }
      const age = Math.floor(num)
      dispatch(age >= 0 && age <= 150 ? setAgeToFilter(age) : setAgeToFilter(null))
      notifyChange()
    },
    [dispatch, notifyChange]
  )

  const handleCityChange = useCallback(
    (e) => {
      dispatch(setCityFilter(e.target.value ?? ''))
      notifyChange()
    },
    [dispatch, notifyChange]
  )

  const handleGenderChange = useCallback(
    (e) => {
      dispatch(setGenderFilter(e.target.value ?? ''))
      notifyChange()
    },
    [dispatch, notifyChange]
  )

  const handleReset = useCallback(() => {
    dispatch(resetFilters())
    notifyChange()
  }, [dispatch, notifyChange])

  const showReset = hasActiveFilters(filters)

  return (
    <Paper
      component="section"
      aria-label="Фильтры картотеки"
      elevation={0}
      sx={{
        mb: 2,
        px: 2,
        py: 1.5,
        border: '1px solid',
        borderColor: 'rgba(93,135,255,0.55)',
        background:
          'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(11,16,32,0.96)) border-box, linear-gradient(135deg, rgba(93,135,255,0.9), rgba(73,190,255,0.7)) padding-box',
        boxShadow: '0 18px 45px rgba(15,23,42,0.8)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          mb: 1.5,
          flexWrap: 'wrap',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: 'primary.light',
            letterSpacing: 0.4,
            textTransform: 'uppercase',
          }}
        >
          Фильтры
        </Typography>
        {showReset ? (
          <Button
            variant="outlined"
            size="small"
            onClick={handleReset}
            aria-label="Сбросить фильтры"
            sx={{
              borderColor: 'rgba(148,163,184,0.7)',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'primary.light',
                color: 'primary.light',
                backgroundColor: 'rgba(93,135,255,0.12)',
              },
            }}
          >
            Сбросить все
          </Button>
        ) : null}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          gap: 2,
        }}
      >
        <TextField
          label="Возраст от"
          type="number"
          size="small"
          value={filters.ageFrom ?? ''}
          onChange={handleAgeFromChange}
          slotProps={{ htmlInput: { min: 0, max: 150, step: 1 } }}
          sx={{ width: 120 }}
          aria-label="Минимальный возраст"
        />
        <TextField
          label="Возраст до"
          type="number"
          size="small"
          value={filters.ageTo ?? ''}
          onChange={handleAgeToChange}
          slotProps={{ htmlInput: { min: 0, max: 150, step: 1 } }}
          sx={{ width: 120 }}
          aria-label="Максимальный возраст"
        />
        <FormControl
          size="small"
          sx={{ minWidth: 200 }}
        >
          <InputLabel id="filter-city-label">Город</InputLabel>
          <Select
            labelId="filter-city-label"
            id="filter-city"
            value={filters.city ?? ''}
            label="Город"
            onChange={handleCityChange}
            aria-label="Фильтр по городу"
          >
            <MenuItem value="">
              <em>Все</em>
            </MenuItem>
            {cityOptions.map((city) => (
              <MenuItem
                key={city}
                value={city}
              >
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ minWidth: 160 }}
        >
          <InputLabel id="filter-gender-label">Пол</InputLabel>
          <Select
            labelId="filter-gender-label"
            id="filter-gender"
            value={filters.gender ?? ''}
            label="Пол"
            onChange={handleGenderChange}
            aria-label="Фильтр по полу"
          >
            <MenuItem value="">
              <em>Все</em>
            </MenuItem>
            {GENDER_OPTIONS.map((opt) => (
              <MenuItem
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  )
}

PeopleFilters.propTypes = {
  onFiltersChange: PropTypes.func,
}

export default PeopleFilters
