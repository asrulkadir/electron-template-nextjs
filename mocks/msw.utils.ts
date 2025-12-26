export const createUrl = (env: "client" | "server") => (url: string) => {
  if (env === "client") {
    return `/api${url}`
  }

  // @Notes Currently, we don't need to import the worker (Node.js) because we are using the worker in the browser.
  // @Docs https://mswjs.io/docs/integrations/node
  if (env === "server") {
    // @Notes Handle the case where route name is not properly formatted.
    return `${process.env.API_SOURCE}${url}`.replace("v1//", "v1/")
  }

  return url
}
