# babel-test

See [#8433](https://github.com/babel/babel/issues/8433)

### Contents
* `packages/a` - defines class A with class properties - ~~crashes the compilation~~ transpiles correctly
* `server/src/index.js` - node app, which depends on `@packages/a`.
* ~~`server/webpack.config.js`~~ `server/rollup.config.js` - handles class properties, among others

#### Tools
* ~~webpack 4.16.5~~ rollup 0.64.1 (compilation)
* babel 7.0.0-beta.56 (js - js transpilation)
* yarn 1.7.0 (monorepo)

---

Type the following to install dependencies and test the issue

`yarn`

### Screenshot
![screen shot 2018-08-08 at 21 30 16](https://user-images.githubusercontent.com/32389245/43859929-61037bca-9b52-11e8-8da7-4ccfd249da03.png)
