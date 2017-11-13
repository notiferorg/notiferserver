var mongoose = require('mongoose'),
    conn = mongoose.connection,
    Grid = require('gridfs-stream'),
    models = ['user', 'device', 'event', 'merchant', 'merchantType', 'subscription'];

Grid.mongo = mongoose.mongo;
conn.once('open', () => {
    console.log('Mongo connection is opened');
    module.exports.Gfs = Grid(conn.db);
});

models.forEach((model) => {
    module.exports[model] = require('./' + model);
});