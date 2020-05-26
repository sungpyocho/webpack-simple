// webpack.common.js
// dev, prod 둘다 쓰게 되는 common 설정
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        // html-loader에서 이미지 만나면 file-loader가 담당할게!
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images", // dist 폴더 속 이미지가 저장될 곳
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
