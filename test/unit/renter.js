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
  describe('#payRent', function(){
    it('should decrease cash & isEvicted stays false', function(){
      var bob = new Renter('bob', '35', 'm', 'social worker');
      bob.cash = 5000;
      bob.payRent(1200);
      expect(bob.cash).to.equal(3800);
      expect(bob.isEvicted).to.be.false;
    });
    it('should change isEvicted to true and cash stays the same', function(){
      var bob = new Renter('bob', '35', 'm', 'social worker');
      bob.cash = 1000;
      bob.payRent(1200);
      expect(bob.cash).to.equal(1000);
      expect(bob.isEvicted).to.be.true;
    });
  });
  describe('#party', function(){
    it('should evict renter if party volume is greater than 8', function(){
      var bob;
      while(true){
        bob = new Renter('bob', '35', 'm', 'social worker');
        bob.party();

        if(bob.isEvicted){
          break;
        }
      }
      expect(bob.isEvicted).to.be.true;
    });
    it('should not evict renter if party volume is less than 9', function(){
      var bob;
      while(true){
        bob = new Renter('bob', '35', 'm', 'social worker');
        bob.party();

        if(!bob.isEvicted){
          break;
        }
      }
      expect(bob.isEvicted).to.be.false;
    });
  });

});
