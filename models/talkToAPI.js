const axios = require ('axios');


//TODO correct error status

const handleGet = (destinationURL) => {
    return axios.get(destinationURL)
        .then((response) => {                        
            const results = JSON.stringify(response.data);
            return results;
        })
        .catch((error) => {
            console.log(error);            
            return {status: 404, message: 'Could not fulfil get request due to error: ' + error};
        }); 
};

const handlePost = (destinationURL, jsonToPost) => {
    return axios.post(destinationURL, jsonToPost)
        .then((response) => {
            const results = JSON.stringify(response.data);
            return results;
        })
        .catch(error => {
            console.log(error);            
            return {status: 404, message: 'Could not fulfil get request due to error: ' + error};
        })
};

const handlePut = (destinationURL, jsonToPost) => {

};

const handleDelete = (destinationURL) => {
    
    return axios.delete(destinationURL)
    .then((response) => {
        const results = JSON.stringify(response.data);
        return results;
    })
    .catch((error) => {
        console.log(error);            
        return {status: 404, message: 'Could not fulfil get request due to error: ' + error};
    });
};

module.exports={handleGet, handleDelete, handlePost, handlePut};