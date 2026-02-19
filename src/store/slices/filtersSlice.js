import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ageFrom: null,
  ageTo: null,
  city: '',
  gender: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAgeFromFilter: (state, action) => {
      state.ageFrom = action.payload
    },
    setAgeToFilter: (state, action) => {
      state.ageTo = action.payload
    },
    setCityFilter: (state, action) => {
      state.city = action.payload
    },
    setGenderFilter: (state, action) => {
      state.gender = action.payload
    },
    resetFilters: (state) => {
      state.ageFrom = null
      state.ageTo = null
      state.city = ''
      state.gender = ''
    },
  },
})

export const { setAgeFromFilter, setAgeToFilter, setCityFilter, setGenderFilter, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer
