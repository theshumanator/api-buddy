const router = require('express').Router();
const {showMainPage, validate, handleUserRequest} = require('../controllers/handleRequest');

router.all('/', showMainPage);
router.post('/index', 
    validate('handleUserRequest'),
    handleUserRequest);



module.exports=router;