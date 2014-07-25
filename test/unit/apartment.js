/* global describe, it, before, beforeEach*/
/* jshint expr:true */

'use strict';

var connect = require('../../app/lib/connect');
var Mongo = require('mongodb');

var expect = require('chai').expect;
var Renter = require('../../app/models/renter');
var Room = require('../../app/models/room');
var Apartment;

describe('Apartment', function(){
  before(function(done){
    connect('property-test', function(){
      Apartment = require('../../app/models/apartment');
      done();
    });
  });
  beforeEach(function(done){
    global.mongodb.collection('apartments').remove(function(){
      var a1 = new Apartment('a1');
      var a2 = new Apartment('a2');
      var a3 = new Apartment('a3');
      var r1 = new Room('living', 10, 12);
      var r2 = new Room('living', 14, 12);
      var r3 = new Room('living', 10, 10);
      var r4 = new Room('bathroom', 8, 9);
      var r5 = new Room('bathroom', 8, 9);
      var r6 = new Room('bathroom', 7, 8);
      var r7 = new Room('bedroom', 10, 12);
      var r8 = new Room('bedroom', 10, 10);
      var r9 = new Room('bedroom', 9, 11);
      var tenant1 = new Renter('bill', 30, 'm', 'waiter');
      var tenant2 = new Renter('gloria', 50, 'f', 'social worker');
      var tenant3 = new Renter('butch', 25, 'm', 'coder');
      a1.renters.push(tenant1);
      a2.renters.push(tenant2);
      a3.renters.push(tenant3);
      a1.rooms.push(r1, r4, r7);
      a2.rooms.push(r2, r5, r8);
      a3.rooms.push(r3, r6, r9);
      a1.save(function(){
        a2.save(function(){
          a3.save(function(){
            done();
          });
        });
      });
    });
  });
  describe('constructor', function(){
    it('should create a new apartment object', function(){
      var a1 = new Apartment('a1');
      expect(a1).to.be.instanceof(Apartment);
      expect(a1).to.be.ok;
      expect(a1.rooms).to.have.length(0);
      expect(a1.renters).to.have.length(0);
    });
  });
  describe('#area', function(){
    it('should return the total area of the apartment', function(){
      var a1 = new Apartment('a1');
      var r1 = new Room('bedroom', '10', '12');
      var r2 = new Room('living room', '12', '12');
      var r3 = new Room('bathroom', '8', '8');
      a1.rooms.push(r1, r2, r3);

      expect(a1.area()).to.equal(328);
    });
  });
  describe('#cost', function(){
    it('should return the total cost of the apartment', function(){
      var a1 = new Apartment('a1');
      var r1 = new Room('bedroom', '10', '12');
      var r2 = new Room('living room', '12', '12');
      var r3 = new Room('bathroom', '8', '8');
      a1.rooms.push(r1, r2, r3);

      expect(a1.cost()).to.equal(1640);
    });
  });
  describe('#bedrooms', function(){
    it('should return the number of bedrooms in the apartment', function(){
      var a1 = new Apartment('a1');
      var r1 = new Room('bedroom', '10', '12');
      var r2 = new Room('living room', '12', '12');
      var r3 = new Room('bathroom', '8', '8');
      a1.rooms.push(r1, r2, r3);

      expect(a1.bedrooms()).to.equal(1);
    });
  });
  describe('#isAvailable', function(){
    it('should inform if the apartment has a available bedroom', function(){
      var a1 = new Apartment('a1');
      var r1 = new Room('bedroom', '10', '12');
      var r2 = new Room('bedroom', '10', '12');
      var r3 = new Room('living room', '12', '12');
      var r4 = new Room('bathroom', '8', '8');
      var bob = new Renter('bob', '35', 'm', 'social worker');
      a1.renters.push(bob);
      a1.rooms.push(r1, r2, r3, r4);

      expect(a1.isAvailable()).to.be.true;
    });
  });
  describe('#purgeEvicted', function(){
    it('should remove evicted renters from apartment', function(){
      var a1 = new Apartment('a1');
      var renter1 = new Renter('bob', '35', 'm', 'social worker');
      var renter2 = new Renter('jim', '19', 'm', 'movie star');
      var renter3 = new Renter('sue', '27', 'f', 'coder');
      renter1.isEvicted = true;
      a1.renters.push(renter1, renter2, renter3);
      a1.purgeEvicted();
      expect(a1.renters).to.have.length(2);
    });
  });
  describe('#collectRent', function(){
    it('should collect rent from the renter', function(){
      var a1 = new Apartment('a1');
      var renter1 = new Renter('bob', '35', 'm', 'social worker');
      renter1.cash = 5000;
      var r1 = new Room('bedroom', '10', '12');
      var r2 = new Room('bedroom', '10', '12');
      var r3 = new Room('living room', '12', '12');
      var r4 = new Room('bathroom', '8', '8');
      a1.rooms.push(r1,r2,r3,r4);
      a1.renters.push(renter1);
      a1.collectRent();

      expect(renter1.cash).to.equal(2760);
      expect(renter1.isEvicted).to.be.false;
      expect(a1.rooms.length).to.equal(4);

    });
  });
  describe('#save', function(){
    it('should save an apartment to the database', function(done){
      var a1 = new Apartment('a1');
      var bill = new Renter('bill', 30, 'm', 'waiter');
      var r1 = new Room('bedroom', '10', '12');
      var r2 = new Room('bedroom', '10', '12');
      var r3 = new Room('living room', '12', '12');
      var r4 = new Room('bathroom', '8', '8');
      a1.renters.push(bill);
      a1.rooms.push(r1,r2,r3,r4);
      a1.save(function(){
        expect(a1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.find', function(){
    it('should find all documents in collection', function(done){
      Apartment.find({}, function(apartments){
        expect(apartments).to.be.ok;
        expect(apartments[0].unit).to.equal('a1');
        expect(apartments).to.have.length(3);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find an  apartment by its id', function(done){
      Apartment.find({}, function(apartments){
        var id = apartments[0]._id;
        Apartment.findById(id, function(apartment){
          expect(apartment.unit).to.equal('a1');
          expect(apartment.renters[0].name).to.equal('bill');
          done();
        });
      });
    });
  });
  describe('.deleteById', function(){
    it('should delete an apartment by its id', function(done){
      Apartment.find({}, function(apartments){
        var id = apartments[0]._id;
        Apartment.deleteById(id, function(){
          Apartment.find({}, function(apartments2){
            expect(apartments2).to.have.length(2);
            expect(apartments2[0].unit).to.equal('a2');
            done();
          });
        });
      });
    });
  });
  describe('.area', function(){
    it('should find the total area of the apartment', function(done){
      Apartment.area(function(area){
        expect(area).to.equal(907);
        done();
      });
    });
  });
  describe('.cost', function(){
    it('should find the total cost of the apartment', function(done){
      Apartment.cost(function(cost){
        expect(cost).to.equal(4535);
        done();
      });
    });
  });

});

