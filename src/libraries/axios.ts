import axios, { type AxiosError } from "axios"

const TIMEOUT = 10000

export enum HttpStatus {
  Unauthorized = "unauthorized",
}

// Ref: https://github.com/vercel/swr/blob/1585a3e37d90ad0df8097b099db38f1afb43c95d/src/_internal/utils/env.ts#L6C14-L6C23
const isWindowDefined = typeof window !== "undefined"
const IS_SERVER = !isWindowDefined || "Deno" in globalThis

// Priority: API_BASE_URL (external API) > /api (MSW mock)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL
const baseURL = API_BASE_URL || (IS_SERVER ? undefined : "/api")

// Check if using external API (for conditional MSW)
export const isUsingExternalApi = Boolean(API_BASE_URL)

export const httpRequest = axios.create({
  // Note: When API_BASE_URL is set, use external API. Otherwise use /api for MSW mock.
  baseURL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
})

export interface TAxiosResponseData {
  code: number
  data: Record<string, unknown>
  message: string
  status: string
  error: string
}

httpRequest.interceptors.response.use(
  /**
   * @Notes Response Interceptor.
   */
  (response) => response,

  /**
   * @Notes Error Interceptor.
   */
  (error: AxiosError<TAxiosResponseData>): Promise<AxiosError<TAxiosResponseData>> => {
    if (error.response?.data?.code === 401 || error?.response?.data?.message === HttpStatus.Unauthorized) {
      window.localStorage.clear()
    }

    return Promise.reject(error)
  },
)
