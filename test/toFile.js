var fs = require('fs');

var test = require('tape');
var JSONStream = require('JSONStream');
var through = require('through');
var dump = require('mongodb-collection-dump');
var objectStreamToFS = require('../');

var fileName = '/tmp/test-file';

var expected = [{
  "_id": 1,
  "name": "Jim",
  "gender": "male"
}, {
  "_id": 2,
  "name": "Jane",
  "gender": "female"
}, {
  "_id": 3,
  "name": "Jill",
  "gender": "female"
}];

test('test saving objects', function(t) {
  t.plan(1);

  var s = objectStreamToFS(fileName);

  var d = dump('mongodb://127.0.0.1/test_db', 'testcollection');

  d.pipe(s);

  var rows = [];

  s.on('done', function() {
    // read in the file and see if its contents are the same
    fs
      .createReadStream(fileName)
      .pipe(JSONStream.parse('*'))
      .pipe(through(write, end));

    function write(row) {
      rows.push(row);
    }

    function end() {
      t.deepEqual(rows, expected);
    }
  });
});