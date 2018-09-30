var loaderUtils = require("loader-utils");
var fs = require('fs');
var hasha = require('hasha');
module.exports = function (source) {
    const { dir, env } = loaderUtils.getOptions(this);
    try{
        fs.mkdirSync('dist');
    }catch(e){

    }
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        let content = '';
        let src = fs.readFileSync(`${dir}/${file}`).toString()
            .replace('export default', 'content =');
        content = eval(src);
        content = JSON.stringify(content);
        const prefix = file.substr(0, file.lastIndexOf('.'));
        let hash = '';
        if(env !== '1'){
            hash = '-' + hasha(content).substr(0, 8);
        }
        source = source.replace(`${prefix}.ts`, `${prefix}${hash}.json`)
        fs.writeFileSync(`dist/${prefix}${hash}.json`, content);
    });
    return source;
}