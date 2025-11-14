module.exports = {
  plugins: [
    "relay",
    [
      "@stylexjs/babel-plugin",
        {
          dev: false,
          test: false,
          runtimeInjection: false,
          treeshakeCompensation: true,
          unstable_moduleResolution: {
              type: "commonJS",
          },
        },
    ]
  ],
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    [
      "@babel/preset-typescript",
      {
        "isTSX": true,
        "allExtensions": true
      }
    ]
  ]
}