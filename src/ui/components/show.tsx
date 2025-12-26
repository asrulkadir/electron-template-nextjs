import type * as React from "react"

// ------------------------------------------------------------------------------------------
// @MainComponent - Show
// ------------------------------------------------------------------------------------------

type TShowProps = {
  when: boolean
}

export function Show({ when, children }: React.PropsWithChildren<TShowProps>) {
  return when ? children : null
}
