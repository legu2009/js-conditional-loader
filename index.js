var loaderUtils = require('loader-utils');

var options;
module.exports = function(source) {
    this.cacheable();
    if (!options) {
        options = loaderUtils.getOptions(this);
    }
    return replace(source, options);
};

var REG = /\/\*\s*<JS_IF(:\S+)?\s+condition={([^}]+)}.*?>.*?\*\/([\s\S]+?)\/\*\s*<\/JS_IF\1\s*>.*?\*\//g;
function replace(source, options) {
    return source.replace(REG, (match, ns, condition, content) => {
        var fn = new Function('o', `with (o) { return ${condition}}`);
        if (fn(options)) {
            return replace(content, options);
        }
        return '';
    });
}
