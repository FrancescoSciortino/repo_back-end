var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Task = require('./api/models/blogArticoloModel'), //created model loading here
  bodyParser = require('body-parser');

  // mongoose instance connection url connection
mongoose.Promise = global.Promise;

/*nuovo ma forse inutile
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Gruppo4Admin:ArticoliPassUser@clusterarticoli.kmveb.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/


/*c'era già

mongoose.connect('mongodb://localhost/Tododb'); 
*/
urlString = "mongodb+srv://Gruppo4Admin:ArticoliPassUser@clusterarticoli.kmveb.mongodb.net/Database1?retryWrites=true&w=majority"
mongoose.connect(urlString); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  if (req.method === "OPTIONS"){
    return res.status(200).end();
  }
  next();
 })

 /*
 app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
})); 
*/


var routes = require('./api/routes/blogArticoloRoutes'); //importing route
routes(app); //register the route




app.listen(port);


console.log('todo list RESTful API server started on: ' + port);



app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});