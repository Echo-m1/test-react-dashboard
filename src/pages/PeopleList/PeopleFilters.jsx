import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
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

function PeopleFilters() {
  const dispatch = useDispatch()
  const filters = useSelector(selectFiltersState)
  const allPeople = useSelector(selectPeopleItems)

  const cityOptions = useMemo(() => getUniqueCities(allPeople), [allPeople])

  const handleAgeFromChange = useCallback(
    (e) => {
      const v = e.target.value
      if (v === '') {
        dispatch(setAgeFromFilter(null))
        return
      }
      const num = Number(v)
      if (Number.isNaN(num)) {
        dispatch(setAgeFromFilter(null))
        return
      }
      const age = Math.floor(num)
      dispatch(age >= 0 && age <= 150 ? setAgeFromFilter(age) : setAgeFromFilter(null))
    },
    [dispatch]
  )

  const handleAgeToChange = useCallback(
    (e) => {
      const v = e.target.value
      if (v === '') {
        dispatch(setAgeToFilter(null))
        return
      }
      const num = Number(v)
      if (Number.isNaN(num)) {
        dispatch(setAgeToFilter(null))
        return
      }
      const age = Math.floor(num)
      dispatch(age >= 0 && age <= 150 ? setAgeToFilter(age) : setAgeToFilter(null))
    },
    [dispatch]
  )

  const handleCityChange = useCallback(
    (e) => {
      dispatch(setCityFilter(e.target.value ?? ''))
    },
    [dispatch]
  )

  const handleGenderChange = useCallback(
    (e) => {
      dispatch(setGenderFilter(e.target.value ?? ''))
    },
    [dispatch]
  )

  const handleReset = useCallback(() => {
    dispatch(resetFilters())
  }, [dispatch])

  const showReset = hasActiveFilters(filters)

  return (
    <Box
      component="section"
      aria-label="Фильтры картотеки"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        gap: 2,
        mb: 2,
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
      {showReset ? (
        <Button
          variant="outlined"
          size="medium"
          onClick={handleReset}
          aria-label="Сбросить фильтры"
        >
          Сбросить
        </Button>
      ) : null}
    </Box>
  )
}

export default PeopleFilters
