const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
    chainWebpack: config => {
        config.plugin('obfuscate').use(WebpackObfuscator);
    }
};