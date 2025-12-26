import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import * as React from "react"

// ------------------------------------------------------------------------------------------
// @MainComponent — React Query Provider
// ------------------------------------------------------------------------------------------

export interface TReactQueryProviderProps {
  children: React.ReactNode
}

export function ReactQueryProvider({ children, ...props }: TReactQueryProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient({}))

  return (
    <QueryClientProvider {...props} client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
