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

});
