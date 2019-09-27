var replace = require("./index.js").replace;

var exm1 = `
console.log('begin');
/*<JS_IF condition={a > 10}>*/
	console.log('a>10');
/*</JS_IF>*/
console.log('end');
`;


var exm2 = `
console.log('begin');
/*<JS_IF condition={a > 10}>*/
console.log('a>10');
/*<JS_ELSE/>*/
console.log('a<=10');
/*</JS_IF>*/
console.log('end');
`;


var exm3 = `
console.log('begin');
/*<JS_IF:a condition={a > 10}>*/
/*<JS_ELSE:a/>*/
console.log('a<10');
/*</JS_IF:a>*/
console.log('end');
`;

var exm4 = `
/*<JS_IF:a condition={a > 10}>*/
console.log('a> 10');
/*<JS_IF:b condition={b > 10}>*/
console.log('b > 10');
/* </JS_IF:b>*/
/* </JS_IF:a>*/
`

console.log(replace(exm4, { a: 5, b: 15 }));
//console.log(replace(exm1, { a: 20 }));