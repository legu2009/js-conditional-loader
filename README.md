# js-conditional-loader

A javascript conditional compiling loader for webpack.    

### Usage
This loader use ````<JS_IF condition={}></JS_IF>```` XML tag in comment;

     
- Mode 1     
````js
/*<JS_IF condition={env == 'op'}>*/
    console.log('op');
/* </JS_IF>*/
/*<JS_IF condition={env != 'op'}>*/
    console.log('not op');
/* </JS_IF>*/
````
when loader.options.env == 'op', Output:
````js
    console.log('op');
````
when loader.options.env != 'op', Output:
````js
    console.log('not op');
````

- Mode 2 -- Nested condition use Namesapce


````js
/*<JS_IF:a condition={env == 'op'}>*/
    console.log('op');
    /*<JS_IF:b condition={sum > 10}>*/
    console.log('sum > 10');
    /* </JS_IF:b>*/
/* </JS_IF:a>*/

````

when loader.options.env == 'op' && sum = 20, Output:
````js
    console.log('op');
    console.log('sum > 10');
````
when loader.options.env == 'op' && sum = 10, Output:
````js
    console.log('op');
````

----

### Setup
````bash
    npm i -D js-conditional-loader
````

### Config in webpack
````js
module: {
    rules: [
        {
            test: /\.jsx$/,
            use: [
                //step-2
                'babel-loader',
                //step-1
                {
                    loader: 'js-conditional-loader',
                    options: {
                        env: process.env.NODE_ENV
                    }
                },
            ]
        }
    ]
}
````
