const axios = require ('axios');
const {commonError} = require('./utils/common-response');

//TODO correct error status

const handleGet = (destinationURL) => {
    return axios.get(destinationURL)
        .then((response) => {                        
            const results = response.data;
            return results;
        })
        .catch((error) => {     
            if (!error.response) {
                return commonError;               
            } else {
                return error.response.data;
            }            
        }); 
};

const handlePost = (destinationURL, jsonToPost) => {
    return axios.post(destinationURL, jsonToPost)
        .then((response) => {
            const results = response.data;
            return results;
        })
        .catch(error => {
            console.log(error);
            if (!error.response) {
                return commonError;
            } else {
                return error.response.data;
            }
        });
};

const handlePut = (destinationURL, jsonToPost) => {    
    return axios.put(destinationURL, jsonToPost)
    .then((response) => {        
        const results = response.data;
        return results;
    })
    .catch(error => {     
        if (!error.response) {
            return commonError;
        } else {
            return error.response.data;
        }
    });
};

const handlePatch = (destinationURL, jsonToPost) => {    
    return axios.patch(destinationURL, jsonToPost)
    .then((response) => {                        
        const results = response.data;
        return results;
    })
    .catch(error => {     
        if (!error.response) {
            return commonError;
        } else {
            return error.response.data;
        }
    });
};

const handleDelete = (destinationURL) => {    
    return axios.delete(destinationURL)
    .then((response) => {
        const results = response.data;
        return results;
    })
    .catch((error) => {
        if (!error.response) {
            return commonError;
        } else {
            return error.response.data;
        }
    });
};

module.exports={handleGet, handleDelete, handlePost, handlePut, handlePatch};