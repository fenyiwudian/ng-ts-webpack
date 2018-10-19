const { getHash } = require('./lang-hash');
const loaderUtils = require("loader-utils");
module.exports = function (source) {
  const { local } = loaderUtils.getOptions(this);
  const start = this.resourcePath.lastIndexOf('/') + 1
    || this.resourcePath.lastIndexOf('\\') + 1;
  const end = this.resourcePath.lastIndexOf('.');
  const code = this.resourcePath.substring(start, end);
  const hash = local
    ? '' : '-' + getHash(code, source);
  const parsed = `export default "${code}${hash}.json"`;
  return parsed;
};
