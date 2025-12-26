import type { AxiosError } from "axios"

export interface TResponseError {
  code: number
  message: string
  status: boolean
  data: null
  error: string
}

function error(error: unknown) {
  const err = error as AxiosError<TResponseError>
  // Note: You can parse or transform `err` response below.
  return err
}

// ==========================================================================================
// @Exports
// ==========================================================================================

export const toolkitHttp = {
  error,
}
