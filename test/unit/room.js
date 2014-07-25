/* global describe, it, before, beforeEach, afterEach */
/* jshint expr:true */

'use strict';

var connect = require('../../app/lib/connect');


var expect = require('chai').expect;
var Room;

describe('Room', function(){
  before(function(done){
    connect('property-test', function(){
      Room = require('../../app/models/room');
      done();
    });
  });
  beforeEach(function(done){
    global.mongodb.collection('rooms').insert([
      {name: 'living room', width: 10, length: 10}, {name:'kitchen', width: 8, length: 8},
      {name:'dining room', width: 7, length:8}, {name: 'bedroom', width: 12, length: 10},
      {name:'bathroom', width: 9, length:10}, {name:'bedroom', width: 8, length: 9}
    ], function(){
      done();
    });
  });

  afterEach(function(done){
    global.mongodb.collection('rooms').remove(function(){
      done();
    });
  });


  describe('constructor', function(){
    it('should create a new room object', function(){
      var bath = new Room('bathroom', '8', '8');
      expect(bath).to.be.ok;
      expect(bath.name).to.equal('bathroom');
      expect(bath.width).to.equal(8);
      expect(bath.length).to.equal(8);
      expect(bath.isBedroom).to.be.false;
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
