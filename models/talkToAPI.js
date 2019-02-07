const axios = require ('axios');


//TODO correct error statueses

const handleGet = (destinationURL) => {
    return axios.get(destinationURL)
        .then((response) => {
            const results = JSON.stringify(response.data);
            return results;
        })
        .catch((error) => {
            console.log(error);            
            next({status: 404, message: 'Could not fulfil get request due to error: ' + error});
        }); 
};

const handlePost = (destinationURL, jsonToPost) => {

};

const handlePut = (destinationURL, jsonToPost) => {

};

const handleDelete = (destinationURL) => {

};

module.exports={handleGet, handleDelete, handlePost, handlePut};