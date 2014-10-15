
/*
 * GET home page.
 */
var action = require('../public/javascripts/action.js');

exports.index = function(req, res){
  res.render('index', { title: 'Action! Framework' });
};