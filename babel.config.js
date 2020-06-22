module.exports = {
  presets: ['next/babel'],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/react'],
    },
    development: {
      presets: ['next/babel'],
    },
  },
};
