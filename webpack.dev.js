// webpack.config.js
// webpack 명령은 기본적으로 이 설정으로 시작
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
  // 웹팩 v4부터는 mode 필수
  // mode 는 production, development, none 3가지 옵션이 존재
  // mode 의 production 은 각 설정마다 내장된 최적화 옵션을 자동으로 설정하여 준다
  mode: "development",
  output: {
    // filename 으로 생성된 번들링을 어느 경로에 생성할 지를 설정
    // __dirname 은 node 에서 제공하는 node 파일의 경로를 담고 있는 변수
    // __이 붙어 있는 변수들은 항상 무엇인가를 담고있는 특별한 변수들임
    // path 에는 절대 경로 설정(절대값으로 static(정적)으로 사용)
    filename: "[name].bundle.js", // 번들링 된 결과 파일의 이름
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 3. style을 DOM에 삽입
          "css-loader", // 2. CSS -> CommonJS 변환
          "sass-loader", // 1. SASS -> CSS 변환
        ], //역순이라는 것을 기억하자.
      },
    ],
  },
});
