const fs = require('fs');
const hasha = require('hasha');
const uglifyJs = require("uglify-js");
const CleanCss = require('clean-css');
class VendorPlugin {
  constructor(options) {
    this.options = options || {};
  }
  apply(compiler) {
    const { options: { local, vendors, jsBefore, prefix } } = this;

    const dataList = [];
    Object.keys(vendors).forEach(key => {
      const list = vendors[key];
      let content = list.reduce((rs, file) => {
        rs += fs.readFileSync(file).toString() + '\n';
        return rs;
      }, '');
      let fileName = '';
      if (local) {
        fileName = key;
      } else {
        if (key.endsWith('.js')) {
          const result = uglifyJs.minify(content);
          if (result.error) {
            throw result.error;
          } else {
            content = result.code;
          }
        }
        else if (key.endsWith('.css')) {
          const result = new CleanCss({}).minify(content);
          if (result.errors.length > 0) {
            throw result.errors;
          } else {
            content = result.styles;
          }
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
            if (temp.fileName.endsWith('.js')) {
              const origin = `<script type=text/javascript src=${prefix}${jsBefore}`;
              data.html = data.html.replace(origin,
                `<script type=text/javascript src=${prefix}${temp.fileName}></script>${origin}`);
            } else if (temp.fileName.endsWith('.css')) {
              const origin = '</head>';
              data.html = data.html.replace(origin,
                `<link rel=stylesheet href=${prefix}${temp.fileName}/></head>`);
            }
          });
          cb(null, data);
        }
      );
    });

    compiler.hooks.emit.tap('VendorPlugin', function (compilation) {
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
    });
  }
}

module.exports = VendorPlugin;
