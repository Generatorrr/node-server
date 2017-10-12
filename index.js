var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var assert = require('assert');

var app = express();

var url = 'mongodb://generatorr:dataGame123@ds113915.mlab.com:13915/score';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    MongoClient.connect(url, function(err, database) {
        assert.equal(null, err);
        database.collection('gameScore').find().toArray(function(err, response) {
            return res.send(response);
        });
        database.close();
    });
});

app.post('/', function (req, res) {
    MongoClient.connect(url, function(err, database) {
        var collection = database.collection('gameScore');
        assert.equal(null, err);
        collection.insert({
            name: req.body.name || 'Unknown player',
            score: req.body.score || 'no score'
        });
    });
});

var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:' + server.address().port)
});