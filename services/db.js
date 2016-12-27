const config = require('config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbConf = process.env.NODE_ENV == 'test' ? config.db.test : config.db.dev;
const dbUrl = `mongodb://${dbConf.usr}:${dbConf.pwd}@${dbConf.host}:${dbConf.port}/${dbConf.name}`;

mongoose.connect(dbUrl);

module.exports = mongoose;
