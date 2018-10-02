const fs = require('fs');
const hasha = require('hasha');
var uglifyJs = require("uglify-js");
class VendorPlugin {
    constructor(options) {
        this.options = options || {};
    }
    apply(compiler) {
        const { options: {local, vendors, before} } = this;

        const dataList = [];
        Object.keys(vendors).forEach(key => {
            const list = vendors[key];
            let content = list.reduce((rs, file) => {
                rs += fs.readFileSync(file).toString() + '\n//////\n';
                return rs;
            }, '');
            let fileName = '';
            if (local) {
                fileName = key;
            } else {
                const result = uglifyJs.minify(content);
                if(result.error){
                    throw result.error;
                }else{
                    content = result.code;
                }
                const hash = hasha(content).substr(0, 8);
                const index = key.lastIndexOf('.');
                fileName = `${key.substring(0, index)}-${hash}${key.substring(index)}`;
            }
            dataList.push({ fileName, content });
        });

        compiler.hooks.compilation.tap('VendorPlugin', (compilation) => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
                'VendorPlugin',
                (data, cb) => {
                    dataList.forEach(temp => {
                        const origin = `<script type=text/javascript src=${before}`;
                        data.html = data.html.replace(origin,
                            `<script type=text/javascript src=${temp.fileName}></script>${origin}`);
                    });
                    cb(null, data);
                }
            );
        });

        compiler.plugin('emit', function (compilation, callback) {
            dataList.forEach(data => {
                compilation.assets[data.fileName] = {
                    source() {
                        return data.content;
                    },
                    size() {
                        return data.content.length;
                    }
                };
            });
            callback();
        });
    }
}

module.exports = VendorPlugin;
