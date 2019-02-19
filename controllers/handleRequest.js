const {handleGet, handleDelete, handlePost, handlePut, handlePatch} = require('../models/talkToAPI');
const {badJsonSent} = require('../models/utils/common-response');
//const { check, validationResult } = require('express-validator/check');
const { body } = require('express-validator/check')


//https://medium.freecodecamp.org/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7
const validate = (funct) => {
    switch (funct) {
        case 'handleUserRequest': {
         return [             
            body('method', 'not selected').exists(),
            body('destinationURL', 'invalid URL.').exists().isURL()]   
        }
      }
    }

const validationHandler = next => result => {
    //console.log(result);

    if (result.isEmpty()) return
    
    
    if (!next) {
        const err = result.array().map(i => `'${i.param}' has ${i.msg}`).join(' ');
        return Promise.reject({status: 400, msg: err})
    }
    else {
        const err = result.array().map(i => `'${i.param}' has ${i.msg}`).join('');
        return Promise.reject({status: 400, msg: err})
    }    
}

const handleUserRequest = (req, res, next) => {       
    req
    .getValidationResult() // to get the result of above validate fn
    /* 
    returns obj like this
    {
        param: "field name",
        msg: "error message", 
        value: "<field input value>"
    }
     */
    .then(validationHandler())
    .then(() => {
        const {method, destinationURL, jsonToSend} = req.body;
        //const userRequest = req.body;
        //const requestKeys = Object.keys(userRequest);        
        const renderedObj = {
            jsonRcvd: '',
            isResponse: true
        };
    
        if (method === 'GET' || method === 'DELETE') {            
                if (method==='GET') {
                    handleGet(destinationURL)
                        .then(results => {
                            renderedObj.jsonRcvd=results;                            
                            res.render('index', renderedObj);
                        })
                        .catch(error => {
                            next(error);
                        });
    
                } else {
                    handleDelete(destinationURL)
                        .then(results => {
                            renderedObj.jsonRcvd=results;                            
                            res.render('index', renderedObj);
                        })
                        .catch(error => {
                            next(error);
                        });
                }            
        } else if (method === 'POST' || method === 'PUT' || method === 'PATCH') {         let parsedJson = '';             
            try {
             parsedJson= JSON.parse(jsonToSend);                
            } catch (error) {                    
                next(badJsonSent);
            }   
            if (method==='POST') {
                handlePost(destinationURL, parsedJson)
                    .then (results => {
                        renderedObj.jsonRcvd=results;                            
                        res.render('index', renderedObj);
                    })
                    .catch(error => {
                        next(error);
                    });
            } else if (method==='PATCH') {
                handlePatch(destinationURL, parsedJson)
                    .then (results => {
                        renderedObj.jsonRcvd=results;                            
                        res.render('index', renderedObj);
                    })
                    .catch(error => {
                        next(error);
                    });
            } else {                    
                handlePut(destinationURL, parsedJson)
                    .then (results => {
                        renderedObj.jsonRcvd=results;
                        res.render('index', renderedObj);
                    })
                    .catch(error => {             
                        next(error)
                    });
            }        
        }                
    })
    .catch(next);   
}

const showMainPage = (req, res, next) => {    
    const renderObj = {
        isResponse: false    
    };
    res.render('index', renderObj);
};

module.exports = {showMainPage, handleUserRequest, validate};