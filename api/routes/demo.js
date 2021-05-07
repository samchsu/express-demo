var express = require('express');
var router = express.Router();
var users = require('../controllers/user.controller.js');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', function(req, res, next) {
    res.send('API is working properly, yo - Sam');
});

router.post('/users', users.create);
router.get('/users', users.findAll);
router.get('/users/total', users.findNum);
router.get('/users/:id', users.findOne);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.delete);

module.exports = router;