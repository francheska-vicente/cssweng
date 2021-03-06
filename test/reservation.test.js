const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const express = require('express');
const app = require('../server.js');

describe('Unit testing the GET /:year-:month-:day/reservation route', function() {
    it('should extract the correct date from the route', function() {
        testDate = 'AUG. 02, 2021';
        return request(app)
            .get('/2021-08-02/reservation/')
            .then(function(response){
                expect(response.text).to.contain(testDate);
            })
    });

    it('should display the correct reservations for the specified date', function() {
        // list = ["6125bd0ba9256232e45f9e0c", "6125bd0ba9256232e45f9e0c"];
        // list2 = ['id="reservation-6125bd0ba9256232e45f9e0c', 'id="reservation-6125bd0ba9256232e45f9e0c'];
        return request(app)
            .get('/2021-08-30/reservation')
            .then(function(response){
                expect(response.text).to.contain('id="reservation-612563d626660c0f8c5d1141');
            })
    });
});

describe('Unit testing the GET /:year-:month-:day/reservation/create route', function() {
    it('should retrieve all the room types', function() {
        types = ['Bridal Family Room', 'Combined Studio Type', 'One Bedroom', 'Studio Type', 'Studio Type with Balcony',
                    'Triplex with Balcony', 'Twin Bed', 'Twin Bed with Balcony', 'Two Bedroom'];
        return request(app)
            .get('/2021-08-02/reservation/create')
            .then(function(response){
                expect(response.text).to.contain(types[0]).and.contain(types[1]).and.contain(types[2]).and.contain(types[3]).and
                .contain(types[4]).and.contain(types[5]).and.contain(types[6]).and.contain(types[7]).and.contain(types[8]);
            })
    });

    it('should extract the correct date from the route and set it as start date', function() {
        testDate = '2021-08-02';
        return request(app)
            .get('/2021-08-02/reservation/create')
            .then(function(response){
                expect(response.text).to.contain(testDate);
            })
    });
});

describe('Unit testing the GET /reservation/:bookingID/edit route', function() {
    it('should retrieve the correct room', function() {
        type = 'Studio Type';
        return request(app)
            .get('/reservation/6125bd3ba9256232e45f9e0d/edit')
            .then(function(response){
                expect(response.text).to.contain(type);
            })
    });

    it('should retrive the correct start date', function() {
        testDate = '2021-08-02';
        return request(app)
            .get('/reservation/6125bd3ba9256232e45f9e0d/edit')
            .then(function(response){
                expect(response.text).to.contain(testDate);
            })
    });

    it('should retrive the correct end date', function() {
        testDate = '2021-08-04';
        return request(app)
            .get('/reservation/6125bd3ba9256232e45f9e0d/edit')
            .then(function(response){
                expect(response.text).to.contain(testDate);
            })
    });

    it('should retrive the correct first name', function() {
        fn = 'Batt';
        return request(app)
            .get('/reservation/6125bd3ba9256232e45f9e0d/edit')
            .then(function(response){
                expect(response.text).to.contain(fn);
            })
    });

    it('should retrive the correct last name', function() {
        ln = 'Man';
        return request(app)
            .get('/reservation/6125bd3ba9256232e45f9e0d/edit')
            .then(function(response){
                expect(response.text).to.contain(ln);
            })
    });

    it('should retrive the correct birthdate', function() {
        test = '2021-08-15';
        return request(app)
            .get('/reservation/6125bd3ba9256232e45f9e0d/edit')
            .then(function(response){
                expect(response.text).to.contain(test);
            })
    });

    it('should retrive the correct address', function() {
        test = 'Home';
        return request(app)
            .get('/reservation/6125bd3ba9256232e45f9e0d/edit')
            .then(function(response){
                expect(response.text).to.contain(test);
            })
    });

    it('should retrive the correct contact number', function() {
        test = '911';
        return request(app)
            .get('/reservation/6125bd3ba9256232e45f9e0d/edit')
            .then(function(response){
                expect(response.text).to.contain(test);
            })
    });
    
    it('should retrive the correct company name', function() {
        test = 'Bat Companyy';
        return request(app)
            .get('/reservation/6125bd3ba9256232e45f9e0d/edit')
            .then(function(response){
                expect(response.text).to.contain(test);
            })
    });

    it('should retrive the correct occupation', function() {
        test = 'Clown';
        return request(app)
            .get('/reservation/6125bd3ba9256232e45f9e0d/edit')
            .then(function(response){
                expect(response.text).to.contain(test);
            })
    });
});

describe('Unit testing the GET /reservation route', function() {
    it('should return the correct reservation', function() {
        testDate = 'AUG. 02, 2021';
        return request(app)
            .get('/reservation/')
            .query({reservationID: '6125bd0ba9256232e45f9e0c'})
            .then(function(response){
                expect(response.body).to.deep.include({_id:"6125bd0ba9256232e45f9e0c",booked_type:"Studio Type"});
            })
    });
});