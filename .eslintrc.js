module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './match-match-game/tsconfig.json',
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "airbnb-typescript/base"
  ],
  rules: {
    eqeqeq: ["error", "always"],
    quotes: ["error", "single"]
  }
};