import { useMutation } from "@tanstack/react-query"
import { httpRequest } from "@/libraries"
import type { TFormValuesLogin } from "./components/auth-form-login"

// @synapsis-codegen-template //

// ==========================================================================================
// @Service — Auth
// ==========================================================================================

export namespace TServiceAuth {
  export type QueryContext = {
    params?: {
      id?: number
      page?: number
      limit?: number
    }
  }

  export type MutationOptions = {
    onSuccess?: (response: TResponseLogin, payload: TFormValuesLogin) => void
    onError?: (error: Error) => void
    onSettled?: VoidFunction
  }

  export type TResponseLogin = {
    token: string
  }
}

// ------------------------------------------------------------------------------------------
// @Queries — Auth
// ------------------------------------------------------------------------------------------

function useAuthOptions(context: TServiceAuth.QueryContext) {
  return {}
}

// ------------------------------------------------------------------------------------------
// @Mutations — Auth
// ------------------------------------------------------------------------------------------

function useAuthMutations() {
  function useAuthLogin(options: TServiceAuth.MutationOptions) {
    return useMutation({
      mutationFn: async (payload: TFormValuesLogin) => {
        // ReqRes.in API requires x-api-key header for free tier
        return httpRequest.post<TServiceAuth.TResponseLogin>(
          "/login",
          { email: payload.email, password: payload.password },
          { headers: { "x-api-key": "reqres-free-v1" } },
        )
      },
      onSuccess: (response, payload, context) => {
        if (options.onSuccess) {
          options.onSuccess(
            {
              token: response.data.token,
            },
            payload,
          )
        }
      },
      onError: (error, payload, context) => {
        if (options.onError) {
          options.onError(error)
        }
      },
      onSettled: (response, error, payload, context) => {
        if (options.onSettled) {
          options.onSettled()
        }
      },
    })
  }

  return {
    useAuthLogin,
  }
}

// ==========================================================================================
// @Exports
// ==========================================================================================

export const servicesAuth = {
  // Queries.
  useAuthOptions,
  // Mutations.
  useAuthMutations,
}
