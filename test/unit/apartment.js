/* global describe, it, before, beforeEach, afterEach */
/* jshint expr:true */

'use strict';

var connect = require('../../app/lib/connect');

var expect = require('chai').expect;
var Apartment;
var Room;
var Renter;

describe('Apartment', function(){
  before(function(done){
    connect('property-test', function(){
      Apartment = require('../../app/models/apartment');
      Room = require('../../app/models/room');
      Renter = require('../../app/models/renter');
      done();
    });
  });
  //beforeEach(function(done){
    //global.mongodb.collection('apartments').save({
    //});
  //});

  afterEach(function(done){
    global.mongodb.collection('apartments').remove(function(){
      done();
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
  
});

