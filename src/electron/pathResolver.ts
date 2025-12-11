import path from "path";
import { app } from "electron";
import { isDev } from "./util.js";

export function getPreloadPath(): string {
  if (isDev()) {
    return path.join(app.getAppPath(), "build", "preload.cjs");
  }
  // In production, build folder is inside app.asar
  return path.join(app.getAppPath(), "build", "preload.cjs");
}
