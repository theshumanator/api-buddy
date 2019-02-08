const axios = require ('axios');


//TODO correct error status

const handleGet = (destinationURL) => {
    return axios.get(destinationURL)
        .then((response) => {                        
            const results = JSON.stringify(response.data);
            return results;
        })
        .catch((error) => {     
            if (!error.response) {
                return JSON.stringify({status: 500, msg: 'Could not reach server. Check your api URL'});
            } else {
                return JSON.stringify(error.response.data);
            }            
        }); 
};

const handlePost = (destinationURL, jsonToPost) => {
    return axios.post(destinationURL, jsonToPost)
        .then((response) => {
            const results = JSON.stringify(response.data);
            return results;
        })
        .catch(error => {
            if (!error.response) {
                return JSON.stringify({status: 500, msg: 'Could not reach server. Check your api URL'});
            } else {
                return JSON.stringify(error.response.data);
            }
        });
};

const handlePut = (destinationURL, jsonToPost) => {
    return axios.put(destinationURL, jsonToPost)
    .then((response) => {        
        const results = JSON.stringify(response.data);
        return results;
    })
    .catch(error => {
        if (!error.response) {
            return JSON.stringify({status: 500, msg: 'Could not reach server. Check your api URL'});
        } else {
            return JSON.stringify(error.response.data);
        }
    });
};

const handleDelete = (destinationURL) => {    
    return axios.delete(destinationURL)
    .then((response) => {
        const results = JSON.stringify(response.data);
        return results;
    })
    .catch((error) => {
        if (!error.response) {
            return JSON.stringify({status: 500, msg: 'Could not reach server. Check your api URL'});
        } else {
            return JSON.stringify(error.response.data);
        }
    });
};

module.exports={handleGet, handleDelete, handlePost, handlePut};