const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugin('obfuscate').use(new WebpackObfuscator({
                identifierNamesGenerator: 'mangled-shuffled',
                identifiersPrefix: 'wf_'
            }));
        }
    }
};