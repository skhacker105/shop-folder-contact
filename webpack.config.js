const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const shareAll = mf.shareAll;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "shopFolderContact",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },

      // For remotes (please adjust)
      name: "shopFolderContact",
      filename: "remoteEntry.js",
      exposes: {
        './routes': './/src/app/app.routes.ts',
      }, 

      // For hosts (please adjust)
      remotes: {
        "shopFolderLogin": "http://localhost:4300/remoteEntry.js"
      },

      shared: { ...shareAll({ singleton: true, strictVersion: true, requiredVersion: "auto" }) }

    }),
    sharedMappings.getPlugin()
  ],
};
