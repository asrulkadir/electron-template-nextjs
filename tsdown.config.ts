import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["./src/electron/main.ts"],
    sourcemap: false,
    clean: true,
    treeshake: true,
    outDir: "build",
    external: ["electron"],
    format: ["cjs"],
    target: "node20",
    dts: false,
  },
  {
    entry: ["./src/electron/preload.ts"],
    sourcemap: false,
    treeshake: true,
    outDir: "build",
    external: ["electron"],
    format: ["cjs"],
    target: "node20",
    dts: false,
  },
]);
