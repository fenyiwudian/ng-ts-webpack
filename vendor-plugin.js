const fs = require('fs');
const hasha = require('hasha');
class LangPlugin {
    constructor(options) {
        this.options = options || {};
    }
    apply(compiler) {
        const { options, local} = this;
        compiler.plugin('emit', function (compilation, callback) {
            Object.keys(options).forEach(key => {
                const list = options[key];
                let content = list.reduce((rs, file) => {
                    rs += fs.readFileSync(file).toString() + '\n//////\n';
                    return rs;
                }, '');
                const hash = hasha(content).substr(0, 8);
                const fileName = local ? `${key}.js` : `${key}-${hash}.js`;
                compilation.assets[fileName] = {
                    source() {
                        return content;
                    },
                    size() {
                        return content.length;
                    }
                };
            });
            callback();
        });
    }
}

module.exports = LangPlugin;
