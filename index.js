var fs = require('fs');

module.exports = {

  outputDir: null,
  paths: [],

  setup: function (config) {
    this.outputDir = config.output_dir;
    this.paths = config.utf8_paths || [];
  },

  run: function (path, options, cb) {
    if (!~this.paths.indexOf(path)) return cb();

    var modified = options.modified || false;
    var finished = options.finished || false;

    var filepath = this.outputDir + path;
    fs.writeFileSync(filepath, fs.readFileSync(filepath, 'binary'), 'utf8');

    return cb();
  }

};
