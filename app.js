var request = require('supertest');
var express = require('express');
var assert = require('assert');
var app = express();

app.post('/camels', function (req, res) {
    res.status(201).json({ _id: 0, color: 'orange', position: 7 });
});

request(app)
    .post('/camels')
    .send({ color: 'orange', position: 7 })
    .set('Content-Type', 'application/json')
    .expect(201)
    .expect('Content-Type', /json/)
    .expect(function (res) {
        assert.equal(res.body._id, 0);
        assert.equal(res.body.color, 'orange');
    })
    .expect('Content-Length', '39')
    .end(function (err, res) {
        if (err) throw err;
    });
