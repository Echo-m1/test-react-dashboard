import { createSlice } from '@reduxjs/toolkit'
import { setByPath } from '@utils/objectPath'

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
    updatePerson: (state, action) => {
      const { id, path, value } = action.payload
      if (!id || !path) return
      const person = state.items.find((p) => p.id === id)
      if (!person) return
      setByPath(person, path, value)
    },
    setPerson: (state, action) => {
      const person = action.payload
      if (!person?.id) return
      const idx = state.items.findIndex((p) => p.id === person.id)
      if (idx >= 0) state.items[idx] = person
    },
  },
})

export const { setPeople, setSelectedId, clearSelectedId, updatePerson, setPerson } = peopleSlice.actions
export default peopleSlice.reducer
