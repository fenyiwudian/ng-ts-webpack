const fs = require('fs');
const {getHash} = require('./lang-hash');
class LangPlugin {
  constructor(options) {
    this.options = options || {};
  }
  apply(compiler) {
    let { options: { local, directory, prefix } } = this;
    prefix = prefix || '';
    compiler.hooks.emit.tap('LangPlugin', function (compilation) {
      const files = fs.readdirSync(directory);
      files.forEach(file => {
        if (file.startsWith('.')) {
          return;
        }
        const langCode = file.substr(0, file.lastIndexOf('.'));
        let content = '';
        const origin = fs.readFileSync(`${directory}/${file}`).toString();
        const hash = local
          ? '' : '-' + getHash(langCode, origin);
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

      const assetsKeys = Object.keys(compilation.assets);

      const bundleKey = assetsKeys.find(key => {
        return key.match(/bundle(.+)?\.js/);
      });
      const langKey = assetsKeys.find(key => key.match(/lang(.+)?\.js/));

      const originSrc = compilation.assets[langKey].source();
      const newSrc = originSrc.replace('bundle.js', prefix + '/' + bundleKey)
        .replace('lang-assets-host-placeholder', prefix + '/');
      compilation.assets[langKey] = {
        source: function () {
          return newSrc;
        },
        size: function () {
          return newSrc.length;
        }
      };
    });
  }
}

module.exports = LangPlugin;
