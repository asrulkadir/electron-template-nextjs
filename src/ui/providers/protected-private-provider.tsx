import { useRouter } from "next/router"
import { useIsomorphicLayoutEffect } from "@/ui/hooks"

// ------------------------------------------------------------------------------------------
// @MainComponent - Protected Private Provider
// ------------------------------------------------------------------------------------------

export type TProtectedPrivateProviderProps = {
  children: React.ReactNode
  isAccountExist: boolean
}

export function ProtectedPrivateProvider({ children, isAccountExist }: TProtectedPrivateProviderProps) {
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    let delay: NodeJS.Timeout

    if (!isAccountExist) {
      delay = setTimeout(() => router.replace("/login"), 200)
    }

    return () => clearTimeout(delay)
  }, [isAccountExist, router])

  if (!isAccountExist) {
    return null
  }

  return children
}
