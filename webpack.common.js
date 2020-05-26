// webpack.config.js
// webpack 명령은 기본적으로 이 설정으로 시작
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // mini-css-extract-plugin 로드

module.exports = {
  entry: "./src/index.js", // 번들을 설정하기 위한 진입점
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
  // plugins: [
  //   // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
  //   new MiniCssExtractPlugin({
  //     filename: "bundle.css",
  //   }),
  // ],

  // module: {
  //   // Babel로 우리의 최신 자바스크립트 코드를
  //   // 브라우저가 알아들을 수 있는 옛 자바스크립트 코드로 번역
  //   rules: [
  //     {
  //       test: /\.js$/, // 변환할 파일 확장자
  //       exclude: /(node_modules)/,
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           presets: ["@babel/preset-env"],
  //         },
  //       },
  //     },
  //     {
  //       // Apply rule for .sass, .scss or .css files
  //       test: /\.(sa|sc|c)ss$/,

  //       // Set loaders to transform files.
  //       // Loaders are applying from right to left(!)
  //       // The first loader will be applied after others
  //       use: [
  //         {
  //           // After all CSS loaders we use plugin to do his work.
  //           // It gets all transformed CSS and extracts it into separate
  //           // single bundled file
  //           loader: MiniCssExtractPlugin.loader,
  //         },
  //         {
  //           // This loader resolves url() and @imports inside CSS
  //           loader: "css-loader",
  //         },
  //         {
  //           // First we transform SASS to standard CSS
  //           loader: "sass-loader",
  //           options: {
  //             outputStyle: "expanded",
  //             indentType: "tab", // 기본값은 space
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       // Apply rule for fonts files
  //       test: /\.(woff|woff2|ttf|otf|eot)$/,
  //       use: [
  //         {
  //           // Using file-loader too
  //           loader: "file-loader",
  //           options: {
  //             outputPath: "fonts",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },

  // devServer: {
  //   // port: 9000,

  //   // hot: HotModuleReplacementPlugin 을 사용해 HMR 기능을 이용하는 옵션
  //   // 소스가 변경되면 자동으로 빌드되어 반영된다. 파일이 수정될 경우 그 부분에 대해 리로드를 해주는 옵션
  //   hot: true,
  // },
};
