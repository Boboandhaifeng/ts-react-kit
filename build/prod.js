const fs = require('fs'),
    path = require('path'),
    webpack = require('webpack'),
    config = require('./webpack.config.prod');

webpack(config, function(err, stats) {
    // show build info to console
    console.log(stats.toString({ chunks: false, color: true }))

    // save build info to file
    fs.writeFile(
        path.join(__dirname, '../dist/__build_info__'),
        stats.toString({ color: false })
    );
});