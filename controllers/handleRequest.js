const {handleGet, handleDelete, handlePost, handlePut} = require('../models/talkToAPI');
const {badJsonSent} = require('../models/utils/common-response');
/*      
    TODO add headers (input and to axios)
    TODO install express validator for sanitsation to do validation
    TODO error handling in controller
    TODO if doing get or delete, remove the json to Send input or disable
*/

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
        } else if (method === 'POST' || method === 'PUT') {
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
                //TODO report error for missing json
            }
        } else {
            //TODO report an error for invalid method    
        }
        
    } else {
        //TODO report an error for missing url or method
    }

}

const showMainPage = (req, res, next) => {    
    const renderObj = {
        isResponse: false    
    };
    res.render('index', renderObj);
};

module.exports = {showMainPage, handleUserRequest};