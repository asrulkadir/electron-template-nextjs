import path from "node:path"
import { app, BrowserWindow } from "electron"
import { getPort } from "get-port-please"

// Log Node.js and Electron versions
console.log('Electron version:', process.versions.electron)
console.log('Node.js version:', process.versions.node)
console.log('Chrome version:', process.versions.chrome)
console.log('V8 version:', process.versions.v8)

const isDev = !app.isPackaged
const DEV_SERVER_URL = "http://localhost:3000"

let mainWindow: BrowserWindow | null = null

function getPreloadPath(): string {
  return path.join(app.getAppPath(), "build", "preload.cjs")
}

function getNextJsPath(): string {
  // In production, Next.js files are in Resources/app folder (extraResources)
  const resourcesPath = path.join(app.getAppPath(), "..")
  return path.join(resourcesPath, "app")
}

async function startNextJsServer(): Promise<number> {
  const port = await getPort({ portRange: [30011, 50000] })
  const nextPath = getNextJsPath()
  const serverPath = path.join(nextPath, "server.js")

  // Set environment variables BEFORE requiring
  process.env.PORT = String(port)
  process.env.HOSTNAME = "localhost"

  // Change working directory to Next.js app folder
  // This is required because server.js uses process.chdir(__dirname)
  const originalCwd = process.cwd()
  process.chdir(nextPath)

  try {
    // Log paths for debugging
    console.log("Next.js path:", nextPath)
    console.log("Server path:", serverPath)
    console.log("Server exists:", require("node:fs").existsSync(serverPath))
    
    // Require the standalone server.js - this starts the server asynchronously
    require(serverPath)
  } catch (err: unknown) {
    const error = err as Error
    console.error("Error requiring server.js:", error.message)
    console.error("Stack trace:", error.stack)
    process.chdir(originalCwd)
    throw err
  }

  // Wait for server to be ready
  const serverReady = await waitForServer(`http://localhost:${port}`, 60)

  if (!serverReady) {
    throw new Error("Next.js server failed to start")
  }

  console.log(`Next.js server started successfully on port: ${port}`)
  return port
}

async function waitForServer(url: string, maxRetries = 30): Promise<boolean> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url)
      if (response.ok || response.status === 404 || response.status === 500) {
        return true
      }
    } catch {
      // Server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(`Waiting for server... (${i + 1}/${maxRetries})`)
  }
  return false
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: true,
    webPreferences: {
      preload: getPreloadPath(),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (isDev) {
    // Development: wait for external Next.js dev server
    console.log("Waiting for Next.js dev server...")

    const ready = await waitForServer(DEV_SERVER_URL)
    if (ready) {
      mainWindow.loadURL(DEV_SERVER_URL)
      mainWindow.webContents.openDevTools()
    } else {
      console.error("Next.js dev server not available")
    }
  } else {
    // Production: start Next.js server internally
    try {
      const port = await startNextJsServer()
      const url = `http://localhost:${port}`
      console.log("Loading URL:", url)
      mainWindow.loadURL(url)
    } catch (error) {
      console.error("Failed to start Next.js server:", error)
      // Show error in window
      mainWindow.loadURL(`data:text/html,<h1>Error starting server</h1><pre>${error}</pre>`)
    }
  }
}


app.on("ready", () => {
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
