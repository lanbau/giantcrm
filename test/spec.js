
var should = require('chai').should()
var expect = require('chai').expect
var supertest = require('supertest')
var api = supertest('https://giantcrm.herokuapp.com')

var OK = 200
var NOT_FOUND = 404

describe('Website Up?', function () {
  it('should exist on the server', function (done) {
    api.get('/')
      .set('Accept', 'application/html')
      .expect(OK, done)
  })
  it('should no longer exist on the server', function (done) {
    api.get('/1')
      .set('Accept', 'application/html')
      .expect(NOT_FOUND, done)
  })
})
