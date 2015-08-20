var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs"), json;

app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function writeJsonFileSync(filepath, content){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.writeFileSync(filepath, content, 0);
    return;
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/comments', function (req, res) {
  res.send(readJsonFileSync("./comments.json"));
});

app.post('/comments', function (req, res) {
  var previousComments = readJsonFileSync("./comments.json");
  console.log(req.body);
  previousComments.push({author: req.body.author, text: req.body.text });
  writeJsonFileSync("./comments.json", JSON.stringify(previousComments, null, 4));
  res.send(previousComments);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});