/* global describe, it */
/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Apartment = require('../../app/models/apartment');

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

});

