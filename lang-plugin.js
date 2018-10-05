const fs = require('fs');
const hasha = require('hasha');
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

      const assetsKeys = Object.keys(compilation.assets);

      const bundleKey = assetsKeys.find(key => key.includes('bundle'));
      const langKey = assetsKeys.find(key => key.includes('lang'));

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
