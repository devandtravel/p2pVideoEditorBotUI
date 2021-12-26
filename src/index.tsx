import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ToggleColorMode } from './ToggleColorMode'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StyledEngineProvider } from '@mui/material/styles'

const queryClient = new QueryClient()

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ToggleColorMode />
    </QueryClientProvider>
  </StyledEngineProvider>,
  document.querySelector('#root')
)
