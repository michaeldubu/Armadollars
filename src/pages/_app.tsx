import type { AppProps } from 'next/app'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <main id="main-content">
        <Component {...pageProps} />
      </main>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}

export default MyApp
