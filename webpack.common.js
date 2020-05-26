// webpack.config.js
// webpack 명령은 기본적으로 이 설정으로 시작
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // mini-css-extract-plugin 로드

module.exports = {
  entry: {
    main: "./src/index.js", // 번들을 설정하기 위한 진입점
    vendor: "./src/vendor.js",
  },
  module: {
    rules: [
      {
        // html 파일은 내가 처리할게!
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        // html-loader에서 이미지 만나면 file-loader가 담당
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          // Using file-loader for these files
          loader: "file-loader",
          // In options we can set different things like format
          // and directory to save
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images", // dist 속 이미지 파일이 저장될 폴더 이름
          },
        },
      },
    ],
  },
  // 플러그인 설정
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // 빌드 전에 사용되는 템플릿
      filename: "index.html", // 빌드 후에 생성될 파일명
    }),
  ],
};
