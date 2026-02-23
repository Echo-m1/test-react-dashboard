import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@components/Layout/Layout'
import Dashboard from '@pages/Dashboard/Dashboard'
import PeopleList from '@pages/PeopleList/PeopleList'
import PersonCard from '@pages/PersonCard/PersonCard'
import { setPeople } from '@store/slices/peopleSlice'
import { generatePeople } from '@data/generatePeople'

function App() {
  const dispatch = useDispatch()
  const peopleCount = useSelector((state) => state.people.items.length)

  useEffect(() => {
    if (peopleCount === 0) {
      dispatch(setPeople(generatePeople(25000, { min: 20000, max: 30000 })))
    }
  }, [peopleCount, dispatch])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/people"
            element={<PeopleList />}
          />
          <Route
            path="/person/:id"
            element={<PersonCard />}
          />
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
