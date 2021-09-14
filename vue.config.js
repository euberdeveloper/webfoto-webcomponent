const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
    chainWebpack: config => {
        config.plugin('obfuscate').use(new WebpackObfuscator({
            identifierNamesGenerator: 'mangled-shuffled',
            identifiersPrefix: 'wf_'
        }));
    }
};