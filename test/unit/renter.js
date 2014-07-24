/* global describe, it */
/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Renter = require('../../app/models/renter');

describe('Renter', function(){
  describe('constructor', function(){
    it('should create a new instance of Renter', function(){
      var bob = new Renter('bob', '35', 'm', 'social worker');

      expect(bob).to.be.ok;
      expect(bob.name).to.equal('bob');
      expect(bob.age).to.equal(35);
      expect(bob.gender).to.equal('m');
      expect(bob.cash).to.be.within(100,5000);
      expect(bob.isEvicted).to.be.false;
      expect(bob.profession).to.equal('social worker');
    });
  });
  describe('#work', function(){
    it('should add cash to renter when he works', function(){
      var bob = new Renter('bob', '35', 'm', 'social worker');

      expect(bob.profession).to.equal('social worker');
      expect(bob.cash).to.be.within(250, 5750);
    });
  });

});
