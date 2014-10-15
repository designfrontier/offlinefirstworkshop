var express = require('express')
    , router = express.Router();

/*
 * GET home page.
 */
router.get('/', function(req, res) {
  /*
   This demonstrates how to render a template on the server.
   */
  res.render('built', {});
});

module.exports = router;