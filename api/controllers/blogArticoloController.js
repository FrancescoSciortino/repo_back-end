'use strict';


var mongoose = require('mongoose'),
  Article = mongoose.model('Articles');
  Comment = mongoose.model('Comments');
  User = mongoose.model('User');

exports.list_all_articles = function(req, res) {
  Article.find( {public: true}, function(err, article) {
    if(Array.isArray(article)){
      article.sort(function(a,b){
        if(a.featured == true && b.featured == false){
            return -1;
        }else if(a.featured == false && b.featured == true){
          return 1;
        }else{
          return 0;
        }
      });
    }
    if (err)
      res.send(err);
    res.json(article);
  });
};




exports.create_an_article = function(req, res) {
  console.log("req-body",req.body)
  var new_article = new Article(req.body);
  new_article.save(function(err, article) {
    if (err)
      res.send(err);
    res.json(article);
  
  });
};


exports.read_an_article = function(req, res) {
  Article.findById(req.params.articleId, function(err, article) {
    if (err)
      res.send(err);
    res.json(article);
  });
};


exports.update_an_article = function(req, res) {
  Article.findOneAndUpdate({_id: req.params.articleId}, req.body, {new: true}, function(err, article) {
    if (err)
      res.send(err);
    res.json(article);
  });
};
exports.patch_an_article = function(req, res) {
  Article.findOneAndUpdate({_id: req.params.articleId}, {$set: req.body}, {new: true}, function(err, article) {
    if (err)
      res.send(err);
    res.json(article);
  });
};

exports.delete_an_article = function(req, res) {

  Article.remove({
    _id: req.params.articleId
  }, function(err, article) {

    Comment.remove({
      id_articolo: req.params.articleId
    }, function(err, comment) {
      if (err)
        res.send(err);
    });

    if (err)
      res.send(err);
    res.json({ message: 'Articolo rimosso con successo' });
  });
};



/* Comments methods */
exports.list_all_comments = function(req, res) {
  var query = req.query;
  Comment.find( query, function(err, comment) {
    if(Array.isArray(comment)){
      comment.sort(function(a,b){
        if(a.Created_date.getTime() > b.Created_date.getTime()){
            return -1;
        }else if(a.Created_date.getTime() < b.Created_date.getTime()){
          return 1;
        }else{
          return 0;
        }
      });
    }
    if (err)
      res.send(err);
    res.json(comment);
  });
};

exports.create_a_comment = function(req, res) {
  console.log("req-body",req.body)
  var new_comment = new Comment(req.body);
  new_comment.save(function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment);
  
  });
};


exports.read_a_comment = function(req, res) {
  Comment.findById(req.params.commentId, function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment);
  });
};

exports.update_a_comment = function(req, res) {
  Comment.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, function(err, comment) {
    if (err)
      res.send(err);
    res.json(article);
  });
};
exports.patch_a_comment = function(req, res) {
  Comment.findOneAndUpdate({_id: req.params.commentId}, {$set: req.body}, {new: true}, function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment);
  });
};


exports.delete_a_comment = function(req, res) {

  Comment.remove({
    _id: req.params.commentId
  }, function(err, comment) {
    if (err)
      res.send(err);
    res.json({ message: 'Commento rimosso con successo' });
  });
};

/*User
exports.create_a_user = function(req,res){
  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
  
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }
  
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/profile');
      }
    });
  }


}
*/