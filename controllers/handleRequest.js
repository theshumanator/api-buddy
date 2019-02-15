const {handleGet, handleDelete, handlePost, handlePut, handlePatch} = require('../models/talkToAPI');
const {badJsonSent} = require('../models/utils/common-response');


const handleUserRequest = (req, res, next) => {    
    const userRequest = req.body;
    const requestKeys = Object.keys(userRequest);        
    const renderedObj = {
        jsonRcvd: '',
        isResponse: true
    }
    if (requestKeys.includes('method') && requestKeys.includes('destinationURL')) {
        const method = userRequest.method;  
        const destinationURL = userRequest.destinationURL;      
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
        } else if (method === 'POST' || method === 'PUT' || method === 'PATCH') {            
            if (requestKeys.includes('jsonToSend')) {
                let jsonToSend='';
                try {
                    jsonToSend= JSON.parse(userRequest.jsonToSend);                
                } catch (error) {                    
                    next(badJsonSent);
                }   
                if (method==='POST') {
                    handlePost(destinationURL, jsonToSend)
                        .then (results => {
                            renderedObj.jsonRcvd=results;                            
                            res.render('index', renderedObj);
                        })
                        .catch(error => {
                            next(error);
                        });
                } else if (method==='PATCH') {
                    handlePatch(destinationURL, jsonToSend)
                        .then (results => {
                            renderedObj.jsonRcvd=results;                            
                            res.render('index', renderedObj);
                        })
                        .catch(error => {
                            next(error);
                        });
                } else {                    
                    handlePut(destinationURL, jsonToSend)
                        .then (results => {
                            renderedObj.jsonRcvd=results;
                            res.render('index', renderedObj);
                        })
                        .catch(error => {             
                            next(error)
                        });
                }
            } else {
                next({status: 400, msg: 'JSON is missing. PUT, PATCH and POST need a json to be sent'});
            }
        }        
    } 
}

const showMainPage = (req, res, next) => {    
    const renderObj = {
        isResponse: false    
    };
    res.render('index', renderObj);
};

module.exports = {showMainPage, handleUserRequest};