import path from "path";

//@ts-ignore
import StylexPlugin from "@stylexjs/webpack-plugin";
import { Configuration } from "webpack";

const config : Configuration = {
  entry: {
    index: './src/main/web-frontend/AppRoot',
    movies: './src/main/web-frontend/projects/MovieApp/MovieAppRoot',
    graphiql: './src/main/web-frontend/projects/Graphiql/GraphiqlPage',
    workout: './src/main/web-frontend/projects/WorkoutTracker/WorkoutTrackerRoot'
  },
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
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src/main/resources/static/bundles'),
    module: true, // Output your bundle as an actual ES module
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: [
          // then run it through babel (to, for example, convert our graphql queries)
          {loader: 'babel-loader'},
          // first compile our typescript into javascript
          {loader: 'ts-loader'},
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new StylexPlugin({
      filename: 'styles.css',
    }),
  ],
  externalsType: "module",
  externals: [
    'sanitize-html',
    'react',
    'react-dom',
    'highlight.js'
  ],
  experiments: {
    outputModule: true, // Tells webpack it can output ES modules
  },
};

export default config;