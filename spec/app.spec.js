const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('End point tests', () => {
    it('Renders the main page', () => {
        return request
            .get('/')
            .expect(200)
            .then((results) => {
                expect(results.text).contains('<h1>Interact with an API endpoint</h1>');
            });
    });    
    it('Renders an error on page if the destinationURL is not passed in the body', () => {
        return request
            .post('/index')
            .send({method: 'POST'})
            .expect(200)
            .then((results) => {
                expect(results.text).contains('has invalid URL');
            });
    });
    it('Renders an error on page if the method is not passed in the body', () => {
        return request
            .post('/index')
            .send({destinationURL: 'http://google.com'})
            .expect(200)
            .then((results) => {
                expect(results.text).contains('not selected');
            });
    });
    it('Renders the json on page for a successful request', () => {
        return request
            .post('/index')
            .send({method: 'GET', destinationURL: 'https://shumanator-nc-knews.herokuapp.com/api/topics'})
            .expect(200)
            .then((results) => {
                expect(results.text).contains('Code is love, code is life');
            });
    });
});  