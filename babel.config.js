module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    },
    'react-native-reanimated/plugin',]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
