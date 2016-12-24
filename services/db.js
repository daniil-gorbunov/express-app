const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://writer:qwe@ds119508.mlab.com:19508/posts');

module.exports = mongoose;
