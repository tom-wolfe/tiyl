/* cSpell:disable */

const watching = process.env.npm_lifecycle_script.indexOf("--single-run") === -1;

module.exports = function (config) {
  config.set({
    browserNoActivityTimeout: 20000,
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      { pattern: "spec/**/*.ts" },
      { pattern: "src/**/*.ts" },
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"],
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ["chrome"],
    plugins: [
      "karma-chrome-launcher",
      "karma-jasmine",
      "karma-typescript"
    ],
    customLaunchers: {
      chrome: {
        base: "Chrome",
        flags: ["--remote-debugging-port=9333"]
      }
    },
    karmaTypescriptConfig: {
      coverageOptions: {
        instrumentation: true
      },
      compilerOptions: {
        resolveJsonModule: true,
        baseUrl: ".",
        paths: {
          "@tiyl/*": [
            "src/*"
          ],
          "@spec/*": [
            "spec/*"
          ]
        },
        lib: [
          "es2017",
          "dom"
        ]
      },
      reports: {
        lcovonly: {
          directory: "coverage",
          filename: "lcov.info",
          subdirectory: "lcov"
        }
      }
    }
  });
};