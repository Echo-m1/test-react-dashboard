import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  selectedId: null,
}

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople: (state, action) => {
      state.items = action.payload
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload
    },
    clearSelectedId: (state) => {
      state.selectedId = null
    },
  },
})

export const { setPeople, setSelectedId, clearSelectedId } = peopleSlice.actions
export default peopleSlice.reducer
