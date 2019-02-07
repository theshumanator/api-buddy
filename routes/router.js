const router = require('express').Router();
const {showMainPage, handleUserRequest} = require('../controllers/handleRequest');

router.all('/', showMainPage);
router.post('/index', handleUserRequest);


module.exports=router;