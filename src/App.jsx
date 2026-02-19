import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import PeopleList from './pages/PeopleList/PeopleList'
import PersonCard from './pages/PersonCard/PersonCard'

function App() {
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
