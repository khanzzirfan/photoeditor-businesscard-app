// next.config.js
const withTM = require("next-transpile-modules")([
  "imask/esm",
  "react-imask",
  "@vincaslt/mp3",
]);

module.exports = {
  ...withTM({
    distDir: "../dist/client",
  }),
};
