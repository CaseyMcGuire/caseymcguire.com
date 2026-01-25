import path from "path";

import { Configuration } from "webpack";
import entries from "./SinglePageApplicationBundles";

const config : Configuration = {
  entry: mergeUnique(
    {
      graphiql: './src/main/web-frontend/apps/Graphiql/GraphiqlPage',
    },
   entries
  ),
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [
      // in order to use absolute paths, set the root folders.
      // In order for typescript to also compile, the project root must match the
      // 'base_url' field in tsconfig. In this case, this is './src/main/web-frontend'
      path.resolve('./src/main/web-frontend'),
      path.resolve('./node_modules')
    ]
  },
  devtool: 'eval-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src/main/resources/static/bundles'),
    publicPath: '/bundles/',
    module: true, // Output your bundle as an actual ES module
  },
  module: {
    rules: [
      {
        // babel uses `@babel/preset-typescript` to strip out types but it doesn't actually run typechecking. As such,
        // this must be handled a separate process.
        test: /\.tsx?$/,
        use: [{loader: 'babel-loader'}]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        // these don't exist and are printing warning messages during a build
        exclude: [
          /node_modules\/monaco-editor/,
          /node_modules\/monaco-graphql/,
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        // Graphiql doesn't work without this
        sideEffects: true,
      },
    ]
  },
  plugins: [],
  externalsType: "module",
  externals: [
    'sanitize-html',
    'react',
    'react-dom',
    "react-dom/client",
    "react/jsx-runtime",
    'highlight.js'
  ],
  experiments: {
    outputModule: true, // Tells webpack it can output ES modules
  },
};

function mergeUnique<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  const keys2 = Object.keys(obj2);

  for (const key of keys2) {
    if (key in obj1) {
      throw new Error(`Duplicate key detected: "${key}" cannot be merged.`);
    }
  }

  return { ...obj1, ...obj2 } as T & U;
}

export default config;