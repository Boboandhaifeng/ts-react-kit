const webpack = require('webpack')
const express = require('express')
const proxy = require('express-http-proxy');
const fs = require('fs')
const path = require('path')
const app = express();

const config = require('./webpack.config.dev.js')
const proxyConf = require('../src/consts/config.ts')
const mockRoutes = require('../mock/route.ts')
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: {
        colors: true,
        chunks: false
    }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/view', (req, res, next) => {
    const filename = path.resolve(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
});

if (proxyConf.MOCK) {
    for (const name in mockRoutes) {
        const s = name.split(' ')
        const method = s[0].toLowerCase()
        const url = s[1]
        const mockFile = mockRoutes[name]
        app[method](url, (function (mockFile) {
            return function (req, res) {
                res.setHeader('Content-Type', 'application/json')
                res.send(fs.readFileSync(path.join(__dirname, '../mock/', mockFile)))
            }
        })(mockFile))
    }
} else {
    const { HOST  = '线上地址' } = proxyConf
    app.use('/api', proxy(HOST));
}

app.listen(3336, "localhost", function(err) {
    err && console.log(err);
});
