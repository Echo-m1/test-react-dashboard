import { configureStore } from '@reduxjs/toolkit'
import peopleReducer from '@store/slices/peopleSlice'
import filtersReducer from '@store/slices/filtersSlice'

const store = configureStore({
  reducer: {
    people: peopleReducer,
    filters: filtersReducer,
  },
})

export default store
