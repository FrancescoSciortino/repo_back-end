
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the Title of the article'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String
  },
  public:{
    type: Boolean
  },
  featured: {
    type: Boolean
  },
  Ttags:{
    type: String,
    default: 'ALL'
  }

});

module.exports = mongoose.model('Tasks', TaskSchema);