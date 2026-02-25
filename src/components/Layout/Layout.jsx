import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import { ROUTES } from '@utils/routes'

const DRAWER_WIDTH = 240

const menuItems = [
  { text: 'Dashboard', icon: DashboardIcon, path: ROUTES.DASHBOARD },
  { text: 'Картотека', icon: PeopleIcon, path: ROUTES.PEOPLE },
]

function Layout({ children }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  const handleNavigation = useCallback(
    (path) => {
      navigate(path)
      if (isMobile) {
        setMobileOpen(false)
      }
    },
    [navigate, isMobile]
  )

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 45%, ${theme.palette.grey[900]} 100%)`,
        color: 'common.white',
      }}
    >
      <Toolbar
        sx={{
          alignItems: 'flex-start',
          flexDirection: 'column',
          gap: 0.5,
          pt: 2,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 700, letterSpacing: 0.5 }}
        >
          Кадры
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.16)' }} />
      <List sx={{ px: 1, py: 1, flex: 1 }}>
        {menuItems.map((item) => {
          const IconComponent = item.icon
          const selected = location.pathname === item.path
          return (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ mb: 0.5 }}
            >
              <ListItemButton
                selected={selected}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  alignItems: 'center',
                  gap: 1,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255,255,255,0.16)',
                    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.45)',
                  },
                  '&.Mui-selected:hover': {
                    bgcolor: 'rgba(255,255,255,0.22)',
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.12)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 1.5,
                    color: 'inherit',
                  }}
                >
                  <IconComponent
                    fontSize="small"
                    sx={{
                      color: selected ? 'secondary.light' : 'primary.light',
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      sx={{
                        fontSize: 14,
                        fontWeight: selected ? 600 : 500,
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          display: { xs: 'block', md: 'none' },
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          boxShadow: '0 10px 25px rgba(15,23,42,0.35)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        aria-label="Основная навигация"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar sx={{ display: { xs: 'block', md: 'none' } }} />
        {children}
      </Box>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
