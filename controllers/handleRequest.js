const {handleGet, handleDelete, handlePost, handlePut} = require('../models/talkToAPI');
/* 
    TODO handle the API post, put and delete   
    TODO install express validator for sanitsation to do validation
    TODO error handling in controller/model and back to page
    TODO if ddoing get or delete, remove the json to Send input or disable
    TODO fix the appearance of json
*/

const handleUserRequest = (req, res, next) => {    
    //console.log(req.body);    //{ method: 'GET', destinationURL: '3443', jsonToSend: '' }
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
                const jsonToSend= JSON.parse(userRequest.jsonToSend);                
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
                    handlePut(destinationURL, jsonToSend);
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