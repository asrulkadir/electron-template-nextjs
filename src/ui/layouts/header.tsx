import type * as React from "react"
import { cx } from "@/libraries/clsx"

// ------------------------------------------------------------------------------------------
// Header Section
// ------------------------------------------------------------------------------------------

type THeaderSectionProps = {} & React.HTMLAttributes<HTMLElement>

export function HeaderSection({ className, children, ...props }: THeaderSectionProps) {
  return (
    <section className={cx("flex justify-start items-center gap-3", "flex 1", className)} {...props}>
      {children}
    </section>
  )
}

// ------------------------------------------------------------------------------------------
// @MainComponent - Header
// ------------------------------------------------------------------------------------------

type THeaderProps = {} & React.HTMLAttributes<HTMLElement>

export function Header({ className, children, ...props }: THeaderProps) {
  return (
    <header
      className={cx(
        "py-4 px-8 h-16",
        "flex justify-between items-center",
        "border-b-2 border-b-gray-200 bg-white",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  )
}
