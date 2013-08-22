var fs = require('fs');
var Transform = require('stream').Transform;

var JSONStream = require('JSONStream');
var inherits = require('inherits');

module.exports = ObjectStreamToFS;

function ObjectStreamToFS(filePath) {
  if (!(this instanceof ObjectStreamToFS)) return new ObjectStreamToFS(filePath);
  Transform.call(this, {objectMode: true});

  if (!filePath) {
    console.error("Error: Invalid file path");
    return;
  }

  var self = this;

  self.filePath = filePath;
  self.f = fs.createWriteStream(self.filePath);
  self.j = JSONStream.stringify();

  self.j.pipe(self.f);

  self.f.on('open', function() {
    self.pipe(self.j);
  });

  self.f.on('finish', function() {
    self.emit('done');
  });

  return self;
}

inherits(ObjectStreamToFS, Transform);

ObjectStreamToFS.prototype._transform = function(chunk, encoding, next) {
  this.push(chunk);
  next();
}