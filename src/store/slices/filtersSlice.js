import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  age: null,
  city: '',
  gender: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAgeFilter: (state, action) => {
      state.age = action.payload
    },
    setCityFilter: (state, action) => {
      state.city = action.payload
    },
    setGenderFilter: (state, action) => {
      state.gender = action.payload
    },
    resetFilters: (state) => {
      state.age = null
      state.city = ''
      state.gender = ''
    },
  },
})

export const {
  setAgeFilter,
  setCityFilter,
  setGenderFilter,
  resetFilters,
} = filtersSlice.actions
export default filtersSlice.reducer
