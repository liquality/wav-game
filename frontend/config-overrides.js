const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = function override(config) {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  if (env) {
    const envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
  }

  // Handle undefined env variables during build

  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;

  // Add the file loader or URL loader configuration
  config.module.rules.push(
    {
      test: /\.(png|jpe?g|gif)$/i,
      type: "asset/resource",
    }
    // Add more loader configurations if needed
  );

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  if (env) {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.config().parsed),
      })
    );
  }
  return config;
};
