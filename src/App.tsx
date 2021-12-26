import { Box } from '@mui/material'
import { Orders } from './components/Orders'

export const App = () => (
  <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3
      }}>
      <Orders />
    </Box>
  </>
)
