var objectStreamToFS = require('../');
var dump = require('mongodb-collection-dump');


var s = objectStreamToFS('/tmp/test-file');

var d = dump('mongodb://127.0.0.1/test_db', 'testcollection');

d.pipe(s);

s.on('done', function(){
  console.log("the object stream has been consumed!")
});