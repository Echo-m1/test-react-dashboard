import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@components/Layout/Layout'
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary'
import Dashboard from '@pages/Dashboard/Dashboard'
import PeopleList from '@pages/PeopleList/PeopleList'
import PersonCard from '@pages/PersonCard/PersonCard'
import { setPeople } from '@store/slices/peopleSlice'
import { generatePeople } from '@data/generatePeople'
import { ROUTES } from '@utils/routes'

function App() {
  const dispatch = useDispatch()
  const peopleCount = useSelector((state) => state.people.items.length)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    if (peopleCount === 0) {
      hasInitialized.current = true
      dispatch(setPeople(generatePeople(25000, { min: 20000, max: 30000 })))
    }
  }, [peopleCount, dispatch])

  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary>
          <Routes>
            <Route
              path={ROUTES.DASHBOARD}
              element={<Dashboard />}
            />
            <Route
              path={ROUTES.PEOPLE}
              element={<PeopleList />}
            />
            <Route
              path={ROUTES.person()}
              element={<PersonCard />}
            />
            <Route
              path="*"
              element={
                <Navigate
                  to={ROUTES.DASHBOARD}
                  replace
                />
              }
            />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  )
}

export default App
