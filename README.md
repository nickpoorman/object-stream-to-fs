#object-stream-to-fs

Consume a stream of objects and save them to a file.

Specify a path to the target file.

[![build status](https://secure.travis-ci.org/nickpoorman/object-stream-to-fs.png)](https://travis-ci.org/nickpoorman/object-stream-to-fs)

# example

save objects to a file:

``` js
var s = objectStreamToFS('/tmp/test-file');

var d = dump('mongodb://127.0.0.1/test_db', 'testcollection');

d.pipe(s);

s.on('done', function(){
  console.log("the object stream has been consumed!")
});

```

# methods

``` js
var objectStreamToFS = require('object-stream-to-fs')
```

## var s = objectStreamToFS(filePath)

Consume the entire stream of objects.

The returned object `s` is a [Stream](http://nodejs.org/api/stream.html). 

# events

## d.on('done', function () {})

Emitted when all writes have been completed and the object stream has been consumed.

# install

With [npm](https://npmjs.org) do:

```
npm install object-stream-to-fs
```

# license

MIT