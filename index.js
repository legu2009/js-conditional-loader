var loaderUtils = require("loader-utils");

module.exports = function(source) {
  this.cacheable && this.cacheable();
  return replace(source, loaderUtils.getOptions(this));
};


const REG_IF = /\/\*\s*<JS_IF(:\S+)?\s+condition={([^}]+)}\s*>\s*\*\/([\s\S]*?)\/\*\s*<\/JS_IF\1\s*>\s*\*\//g;
const REG_ELSE = /^([\s\S]*?)\/\*\s*<JS_ELSE\s*\/?>\s*\*\/([\s\S]+)$/;



function replace(source, options) {
  return source.replace(REG_IF, (text, ns, condition, content) => {
	const fn = new Function("o", `with (o) { return ${condition}}`);
	let conditionResult = fn(options);
	let reg = REG_ELSE;
	if (ns) {
	  reg = new RegExp(`^([\\s\\S]*?)\\/\\*\\s*<JS_ELSE${ns}\\s*\\/?>.*?\\*\\/([\\s\\S]+)$`,"");
	}
	
	let contentYes = '', contentNo = '';
	let match = content.match(reg);
	
	if (match) {
		contentYes = match[1];
		contentNo = match[2];
	} else {
		contentYes = content;
		contentNo = '';
	}
	if (conditionResult) {
		return replace(contentYes, options);
	} else {
		return replace(contentNo, options);
	}
  });
}

module.exports.replace = replace;
