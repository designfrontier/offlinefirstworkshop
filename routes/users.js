var Q = require('q') // A promises library
    , logger = require('lds-logger').logger
    , express = require('express')
    , router = express.Router();

/*
 * GET users listing.
 */

router.get('/', function (req, res) {
  /*
    More than likely you will generate data in a dynamic way rather than 
    hardcoding it. For instance a DB or service you are calling. 
    This merely demonstrates how you would send the data back to the client.
   */
  res.send([
    {
      name: 'John',
      id: 34556
    },
    {
      name: 'Bill',
      id: 987655
    }
  ]);
});

module.exports = router;