// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs"],
  clean: true,
  sourcemap: true,
  target: "es2020",
  skipNodeModulesBundle: true,
  esbuildOptions(options) {
    options.alias = {
      "@middlewares": "./src/middlewares",
      "@modules": "./src/modules",
      "@utils": "./src/utils",
      "@config": "./src/config",
      "@types": "./src/types",
      "@lib": "./src/lib",
      "@auth": "./src/auth",
    };
  },
});
