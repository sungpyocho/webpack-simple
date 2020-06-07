// production 설정
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // mini-css-extract-plugin 로드
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  // 웹팩 v4부터는 mode 필수
  // mode 는 production, development, none 3가지 옵션이 존재
  // mode 의 production 은 각 설정마다 내장된 최적화 옵션을 자동으로 설정하여 준다
  mode: "production",
  output: {
    // filename 으로 생성된 번들링을 어느 경로에 생성할지 설정
    // __dirname 은 node 에서 제공하는 node 파일의 경로를 담고 있는 변수
    // __이 붙어 있는 변수들은 항상 무엇인가를 담고있는 특별한 변수들임
    // path 에는 절대 경로 설정(절대값으로 static(정적)으로 사용)
    filename: "[name].[contentHash].bundle.js", // 번들링된 파일 이름
    path: path.resolve(__dirname, "dist"),
  },
  // sass-loader v7.3.0 이상에서는 Minimize를 해주기 때문에, 아래와 같이 CSS/JS두개를 따로 써줄 필요가 없어졌다.
  //   optimization: {
  //     minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  //   },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }), // JS에 숨어있던 CSS를 별도의 파일로 추출해내는 plugin
    new CleanWebpackPlugin(), // 웹팩 빌드할때마다 dist폴더에서 필요없는 파일 제거
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. 별도의 css파일로 분리
          "css-loader", // 2. CSS -> CommonJS 변환
          "sass-loader", // 1. SASS -> CSS 변환
        ], //역순이라는 것을 기억하자.
      },
    ],
  },
});
