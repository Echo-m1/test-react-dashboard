import { configureStore } from '@reduxjs/toolkit'
import peopleReducer from './slices/peopleSlice'
import filtersReducer from './slices/filtersSlice'

const store = configureStore({
  reducer: {
    people: peopleReducer,
    filters: filtersReducer,
  },
})

export default store
