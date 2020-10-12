
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  title: {
    type: String,
    default: 'Senza Titolo'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: 'Non puoi pubblicare un articolo senza testo'
  },
  public:{
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  Ttags:{
    type: Array,
    default: ['ALL']
  },
  autore:{
    type: String,
    default: 'Anonimo'
  }

});

module.exports = mongoose.model('Tasks', TaskSchema);