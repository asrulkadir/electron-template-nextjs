import { useRouter } from "next/router"
import { useIsomorphicLayoutEffect } from "@/ui/hooks"

// ------------------------------------------------------------------------------------------
// @MainComponent — Protected Guest Provider
// ------------------------------------------------------------------------------------------

export type TProtectedGuestProviderProps = {
  children: React.ReactNode
  isAccountExist: boolean
}

export function ProtectedGuestProvider({ isAccountExist, children }: TProtectedGuestProviderProps) {
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    if (isAccountExist) {
      router.replace("/dashboard")
    }
  }, [isAccountExist, router])

  if (isAccountExist) {
    return null
  }

  return children
}
