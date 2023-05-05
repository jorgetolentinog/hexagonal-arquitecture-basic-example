const { pathsToModuleNameMapper } = require("ts-jest");
const { jsWithTs } = require("ts-jest/presets");

module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  resetMocks: true,
  restoreMocks: true,
  transform: jsWithTs.transform,
  collectCoverageFrom: ["src/**"],
};
