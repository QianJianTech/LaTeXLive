module.exports = {
  mode:"development",
  entry: {
    latex: "./js/latex/main.js",
    readme: "./js/readme/main.js",
    update: "./js/update/main.js",
    messageboard: "./js/messageboard/main.js",
    login: "./js/login/main.js",
    personal: "./js/personal/main.js",
  },
  output: {
    path: __dirname + "/publish",
    filename: "[name].bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
