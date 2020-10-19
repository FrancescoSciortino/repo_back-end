'use strict';


var mongoose = require('mongoose'),
  Article = mongoose.model('Articles'),
  Comment = mongoose.model('Comments'),
  User = mongoose.model('Users');

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
  var bool = false;
  
  Article.findById(req.body.id_articolo, function(err, article) {
      
    if(article != null){
      var new_comment = new Comment(req.body);
      new_comment.save(function(err, comment) {
        if (err)
          res.send(err);
        res.json(comment);
      
        });
    }else{
      res.send("Errore: L'id articolo non corrisponde a nessun articolo salvato");
    }
    if(err){
      res.send(err);
    }
  })
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

/* users

exports.list_all_users = function(req, res) {
  var query = req.query;
  User.find( query, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.create_a_user = function(req,res){
    
    bcrypt.hash(req.body.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      req.body.password = hash;
      next();
    })
  
    //use schema.create to insert data into the db
    User.create(req.body, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/profile');
      }
    });


  }
  
exports.read_a_user = function(req, res) {
  User.find({username: req.params.userId}, function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment);
  });
};
*/