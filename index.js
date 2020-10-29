var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var path = require('path');

app.use(express.static(__dirname + '/public'));



app.listen(port);