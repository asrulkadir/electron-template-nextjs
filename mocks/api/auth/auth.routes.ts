import { HttpResponse, http } from "msw"
import type { TTypesAuth } from "./auth.types"
import { createUrl } from "~/mocks/msw.utils"

// ------------------------------------------------------------------------------------------
// @Mock Users
// ------------------------------------------------------------------------------------------

const MOCK_USERS = [
  { email: "eve.holt@reqres.in", password: "cityslicka", token: "QpwL5tke4Pnpja7X4" },
  { email: "admin@example.com", password: "admin123", token: "AdminToken123456789" },
  { email: "user@example.com", password: "user123", token: "UserToken987654321" },
]

// ------------------------------------------------------------------------------------------
// @Routes — Auth
// ------------------------------------------------------------------------------------------

const loginRoute = http.post<never, TTypesAuth.LoginRequest>(createUrl("client")("/login"), async ({ request }) => {
  const body = await request.json()

  const user = MOCK_USERS.find((u) => u.email === body.email && u.password === body.password)

  if (user) {
    return HttpResponse.json<TTypesAuth.LoginResponse>({
      code: 200,
      message: "Login successful",
      token: user.token,
    })
  }

  return HttpResponse.json(
    {
      code: 400,
      message: "Invalid credentials",
      error: "user not found",
    },
    { status: 400 },
  )
})

// ------------------------------------------------------------------------------------------
// @Router
// ------------------------------------------------------------------------------------------

export const authRouter = [loginRoute]
