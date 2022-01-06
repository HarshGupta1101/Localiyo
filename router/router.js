const route = require('express').Router();
const controller =require('../controllers/controller');
const store = require('../middleware/multer');
require('../src/app')

module.exports=route;