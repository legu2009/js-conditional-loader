var loaderUtils = require("loader-utils");

module.exports = function(source) {
  this.cacheable && this.cacheable();
  return replace(source, loaderUtils.getOptions(this));
};

const REG_IF = /\/\*\s*<JS_(IF)\s+condition={([^}]+)}\s*\/?>\s*\*\//g;
const REG_ELSE = /\/\*\s*<JS_(ELSE)\s*\/?>\s*\*\//g;
const REG_ENDIF = /\/\*\s*<JS_(ENDIF)\s*\/?>\s*\*\//g;

const REG = RegExp(
  REG_IF.source + "|" + REG_ELSE.source + "|" + REG_ENDIF.source + "|$",
  "g"
);

function replace(source, options) {
  let result = "";
  let index = 0;
  let stack = [true],
    state;
  source.replace(REG, (match, ifTag, condition, elseTag, endTag, offset) => {
	  console.log(1111, match, ifTag, condition, elseTag, endTag, offset)
    state = stack[stack.length - 1];
    if (state) {
      result += source.slice(index, offset);
	}
	if (ifTag) {
		let fn = new Function("o", `with (o) { return ${condition}}`);
		stack.push(fn(options));
	} else if (elseTag) {
		stack[stack.length - 1] = !stack[stack.length - 1];
	} else if (endTag) {
		stack.pop();
	}
    index = offset + match.length;
    return match;
  });
  return result;
}

module.exports.replace = replace;
