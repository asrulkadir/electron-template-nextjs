import type * as React from "react"

// ------------------------------------------------------------------------------------------
// @MainComponent — Box
// ------------------------------------------------------------------------------------------

export type TBoxProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export function Box({ children, ...props }: TBoxProps) {
  return (
    <div id="layout-box" data-testid="layout-box" {...props}>
      {children}
    </div>
  )
}
