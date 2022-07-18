const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ['umd'],
      name: "protokb-kle-import",
      fileName: () => 'index.js',
    }
  },
});
