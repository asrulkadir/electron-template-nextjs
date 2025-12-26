import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Sora } from "next/font/google"
import * as React from "react"
import { listenAndServeMocks } from "~/mocks/main"
import { AntdConfigProvider, AntdNotificationProvider, ReactQueryProvider } from "@/ui/providers"

// ==========================================================================================
// Miscellaneous
// ==========================================================================================

const soraFont = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

// ------------------------------------------------------------------------------------------
// @MainComponent - App
// ------------------------------------------------------------------------------------------

export default function App({ Component, pageProps }: AppProps) {
  const [isMswReady, setIsMswReady] = React.useState(false)

  React.useEffect(() => {
    listenAndServeMocks().then(() => {
      setIsMswReady(true)
    })
  }, [])

  // Wait for MSW to be ready in development
  if (process.env.NODE_ENV === "development" && !isMswReady) {
    return null
  }

  return (
    <div className={`${soraFont.variable}`}>
      <AntdConfigProvider>
        <AntdNotificationProvider>
          <ReactQueryProvider>
            <Component {...pageProps} />
          </ReactQueryProvider>
        </AntdNotificationProvider>
      </AntdConfigProvider>
    </div>
  )
}
