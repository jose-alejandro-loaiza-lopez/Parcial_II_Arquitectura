const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mf-movies',
  filename: "remoteEntry.js",
  exposes: {
    './MoviesPage': './src/app/presentation/pages/movies/movies.page.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
