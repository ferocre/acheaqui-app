module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './app/components',
            '@utils': './app/utils',
            '@hooks': './app/hooks',
            '@constants': './app/constants',
            '@assets': './app/assets',
          },
        },
      ],
    ],
  };
};
