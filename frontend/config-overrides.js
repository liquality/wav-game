const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = function override(config) {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

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
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192, // Specify the maximum size (in bytes) for embedding images as Data URLs
            name: "[name].[ext]",
            outputPath: "images/", // The output directory for the images
            publicPath: "/images/", // The public URL path for the images
          },
        },
      ],
    }
    // Add more loader configurations if needed
  );

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.DefinePlugin(envKeys),
  ]);
  return config;
};
