var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs"), json;

app.use(bodyParser.urlencoded({extended: false}));

//This allows CORS (Cross Origin Resource Sharing) for reading and writing to comments.json
//As explained at http://jonathanmh.com/how-to-enable-cors-in-express-js-node-js/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//read from a file
function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

//write content to a file
function writeJsonFileSync(filepath, content){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.writeFileSync(filepath, content, 0);
    return;
}

//serve the react tutorial's index.html file
app.get('/', function (req, res) {
  res.sendfile('./index.html');
});

//send the comments as json
app.get('/comments', function (req, res) {
  res.send(readJsonFileSync("./comments.json"));
});

//write comments to json file
app.post('/comments', function (req, res) {
  var previousComments = readJsonFileSync("./comments.json");
  previousComments.push({author: req.body.author, text: req.body.text });
  writeJsonFileSync("./comments.json", JSON.stringify(previousComments, null, 4));
  res.send(previousComments);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});