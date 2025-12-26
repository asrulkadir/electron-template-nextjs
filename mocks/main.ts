export async function listenAndServeMocks() {
  // Skip MSW if not in development
  if (process.env.NODE_ENV !== "development") {
    return
  }

  // Skip MSW if external API is configured
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL
  if (API_BASE_URL) {
    console.log("[MSW] Skipped - Using external API:", API_BASE_URL)
    return
  }

  console.log("[MSW] Starting mock service worker...")

  if (typeof window === "undefined") {
    const node = await import("./msw.node")
    node.server.listen()
    return
  }

  const { worker } = await import("./msw.browser")
  return worker.start({ onUnhandledRequest: "bypass" })
}
