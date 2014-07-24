/* global describe, it */
/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Apartment = require('../../app/models/apartment');
var Room = require('../../app/models/room');

describe('Apartment', function(){
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

});

