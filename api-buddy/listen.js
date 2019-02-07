const app = require('./app');

const PORT = process.env.PORT || 9090;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Listening to port: ${PORT}`);
    }    
} );