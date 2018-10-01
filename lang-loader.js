const hasha = require('hasha');
const loaderUtils = require("loader-utils");
module.exports = function (source) {
    const { local } = loaderUtils.getOptions(this);
    const start = this.resourcePath.lastIndexOf('/') + 1;
    const end = this.resourcePath.lastIndexOf('.');
    const code = this.resourcePath.substring(start, end);
    const hash = local
        ? '' : '-' + hasha(source).substr(0, 8);
    const parsed = `export default "${code}${hash}.json"`;
    console.log(parsed);
    return parsed;
}