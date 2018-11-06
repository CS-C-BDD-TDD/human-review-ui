module.exports =
  {
    globals: {
      __DEV__: true,
    },
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.{vue}',
    ],
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['json', 'lcov', 'text', 'html'],
    coverageThreshold: {
      global: {
        branches: 10,
        functions: 0,
        lines: 10,
        statements: 10,
      },
    },
    testMatch: ["**/*.steps.js"],
    moduleFileExtensions: [
      'js',
      'json',
      'vue',
    ],
    reporters: [
      "default",
      [
        "./node_modules/jest-html-reporter", {
          pageTitle: "Test Report",
          includeFailureMsg: true,
          includeConsoleLog: true,
          theme: "darkTheme",
          outputPath: "unit-test-reports/index.html"
        }
      ]
    ],
    moduleNameMapper: {
      "^vue$": "vue/dist/vue.common.js",
      "^@/(.*)$": "<rootDir>/src/$1",
      quasar: "quasar-framework/dist/umd/quasar.mat.umd.min.js"
    },
    resolver: null,
    transform: {
      '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
      '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    },
    snapshotSerializers: [
      '<rootDir>/node_modules/jest-serializer-vue',
    ],
  };
