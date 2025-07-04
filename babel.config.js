module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@": "./src",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@store": "./src/store",
          "@types": "./src/types",
          "@utils": "./src/utils",
          "@hooks": "./src/hooks",
          "@assets": "./src/assets",
        },
      },
    ],
  ],
};
