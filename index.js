var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
if (port == null || port == "") {
    port = 8000;
  }

app.use(express.static(__dirname + '/public'));
app.listen(port);