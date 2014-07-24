/* global describe, it */
/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Room = require('../../app/models/room');

describe('Room', function(){
  describe('constructor', function(){
    it('should create a new room object', function(){
      var bath = new Room('bathroom', '8', '8');
      expect(bath).to.be.ok;
      expect(bath.name).to.equal('bathroom');
      expect(bath.width).to.equal(8);
      expect(bath.length).to.equal(8);
    });
  });
  describe('#area', function(){
    it('should calculate the area of a room', function(){
      var living = new Room('living room', '10', '10');
      expect(living.area()).to.equal(100);
    });
  });
  describe('#cost', function(){
    it('should return the cost per sq.ft. of the room (assumes $5/sq.ft.)', function(){
      var living = new Room('living room', '10', '10');
      expect(living.cost()).to.equal(500);
    });
  });

});
