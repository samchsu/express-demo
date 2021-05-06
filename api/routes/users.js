var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Jack: jack@gmail.com');
});

module.exports = router;
