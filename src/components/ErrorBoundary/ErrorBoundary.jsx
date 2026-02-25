import { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Button, Paper } from '@mui/material'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false })
    globalThis.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            p: 3,
          }}
        >
          <Paper
            variant="outlined"
            sx={{ p: 4, maxWidth: 400, textAlign: 'center' }}
          >
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
            >
              Что-то пошло не так
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Произошла ошибка. Попробуйте обновить страницу.
            </Typography>
            <Button
              variant="contained"
              onClick={this.handleReload}
              aria-label="Обновить страницу"
            >
              Обновить страницу
            </Button>
          </Paper>
        </Box>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
}

export default ErrorBoundary
