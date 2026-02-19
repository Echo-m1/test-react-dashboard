import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import store from '@store'
import theme from '@theme'
import { setPeople } from '@store/slices/peopleSlice'
import { generatePeople } from '@data/generatePeople'
import '@/index.css'
import App from '@/App.jsx'

function initStore() {
  if (!store.getState().people.items.length) {
    store.dispatch(setPeople(generatePeople(100, { min: 50, max: 150 })))
  }
}

const root = createRoot(document.getElementById('root'))
initStore()
root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
