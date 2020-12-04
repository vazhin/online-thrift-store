const request = require('supertest');
const app = require('../app.js');

describe('GET /', () => {
  it('should render "index.ejs"', function (done) {
    request(app).get('/').expect('Content-Type', /html/, done);
  });
});
