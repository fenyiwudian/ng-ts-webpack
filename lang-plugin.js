const fs = require('fs');
const hasha = require('hasha');
class LangPlugin {
    constructor(options) {
        this.options = options || {};
    }
    apply(compiler) {
        const { options: { local, directory } } = this;
        compiler.plugin('emit', function (compilation, callback) {
            const files = fs.readdirSync(directory);
            files.forEach(file => {
                const langCode = file.substr(0, file.lastIndexOf('.'));
                let content = '';
                const origin = fs.readFileSync(`${directory}/${file}`).toString();
                const hash = local
                    ? '' : '-' + hasha(origin).substr(0, 8);
                const replaced = origin.replace('export default', 'content = ');
                content = eval(replaced);
                const text = JSON.stringify(content);
                const fileName = `${langCode}${hash}.json`;
                compilation.assets[fileName] = {
                    source: function () {
                        return text;
                    },
                    size: function () {
                        return text.length;
                    }
                };
            });
            callback();
        });
    }
}

module.exports = LangPlugin;