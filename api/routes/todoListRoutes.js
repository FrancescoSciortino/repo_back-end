'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/articles')
    .get(todoList.list_all_articles)
    .post(todoList.create_an_article);

    
  app.route('/articles/:articleId')
    .get(todoList.read_an_article)
    .put(todoList.update_an_article)
    .delete(todoList.delete_an_article)
    .patch(todoList.patch_an_article);



  // Comments Routes

  app.route('/comments')
    .get(todoList.list_all_comments)
    .post(todoList.create_a_comment);


  app.route('/comments/:commentId')
    .get(todoList.read_a_comment)
    .put(todoList.update_a_comment)
    .delete(todoList.delete_a_comment)
    .patch(todoList.patch_a_comment);




    /*
  app.route('/users')
  .get(todoList.list_all_users)
  .post(todoList.create_a_user);
  */
};


