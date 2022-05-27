import { SWRConfig } from 'swr'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/system'
import { lightTheme } from '../themes'
import { CssBaseline } from '@mui/material'
import { CartProvider, UiProvider } from '../context'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <CartProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </SWRConfig>
    </CartProvider>
  );
}

export default MyApp
