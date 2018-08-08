# babel-test

See [#8433](https://github.com/babel/babel/issues/8433)

### Contents
* `packages/a` - defines class A with class properties - crashes the compilation
* `server/src/index.js` - node app, which depends on `@packages/a`.
* `server/webpack.config.js` - handles class properties, among others

#### Tools
* webpack 4.16.5 (compilation)
* babel 7.0.0-beta.56 (js - js transpilation)
* yarn 1.7.0 (monorepo)

---

Type the following to install dependencies and test the issue

`yarn`

### Screenshot
![screen shot 2018-08-07 at 22 22 09](https://user-images.githubusercontent.com/32389245/43800364-605fe676-9a90-11e8-8b43-6b702ad25004.png)
