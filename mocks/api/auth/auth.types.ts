// ==========================================================================================
// @Types — Auth
// ==========================================================================================

export namespace TTypesAuth {
  export type LoginRequest = {
    email: string
    password: string
  }

  export type LoginResponse = {
    code: number
    message: string
    token: string
  }
}
