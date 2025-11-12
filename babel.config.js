module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // autres plugins éventuels ici
      'react-native-reanimated/plugin' // <-- DOIT être le dernier
    ],
  };
};