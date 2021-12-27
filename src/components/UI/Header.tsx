import { useContext } from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { AppBar, CssBaseline, IconButton, Toolbar } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from '../../ThemedApp'

export const Header = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  return (
    <>
      <CssBaseline />
      <AppBar position='static' sx={{ m: 0, p: 0 }}>
        <Toolbar
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}>
          <h1>Video Editor Bot</h1>
          <div>
            <IconButton sx={{ m: 1, p: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
              {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ m: 1 }} /> : <Brightness4Icon sx={{ m: 1 }} />}
            </IconButton>
            {theme.palette.mode} mode
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}
