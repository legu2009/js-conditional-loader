var replace = require("./index2.js").replace;

var exm1 = `
console.log('begin');
/*<JS_IF condition={a > 10}>*/
	console.log('a>10');
/*<JS_ENDIF>*/
console.log('end');
`;

var exm2 = `
console.log('begin');
/*<JS_IF condition={a > 10}>*/
console.log('a>10');
/*<JS_ELSE/>*/
console.log('a<=10');
/*<JS_ENDIF>*/
console.log('end');
`;

var exm3 = `
/*<JS_IF condition={a > 10}>*/
console.log('a> 10');
/*<JS_IF condition={b > 10}>*/
console.log('b > 10');
/*<JS_ENDIF>*/
/*<JS_ENDIF>*/
`;

var exm4 = `

console.log('a> 10');

console.log('b > 10');

`;

console.log(replace(exm4, { a: 15, b: 5 }));
//console.log(replace(exm1, { a: 20 }));
