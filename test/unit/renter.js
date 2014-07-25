/* global describe, it, before, beforeEach, afterEach*/
/* jshint expr:true */

'use strict';

var connect = require('../../app/lib/connect');

var expect = require('chai').expect;
var Renter;

describe('Renter', function(){
  before(function(done){
    connect('property-test', function(){
      Renter = require('../../app/models/renter');
      done();
    });
  });
  beforeEach(function(done){
    global.mongodb.collection('renters').insert([
      {name: 'Jeremy', age: 26, gender: 'm', profession: 'coder'},
      {name:'Marilyn', age: 30, gender: 'f', profession: 'movie star'},
      {name:'Mary', age: 45, gender: 'f', profession: 'social worker'},
      {name:'Steven', age: 24, gender: 'm', profession: 'waiter'},
      {name:'Katelyn', age: 22, gender: 'f', profession: 'waiter'},
      {name:'Susan', age: 27, gender: 'f', profession: 'coder'}
    ], function(){
      done();
    });
  });

  afterEach(function(done){
    global.mongodb.collection('renters').remove(function(){
      done();
    });
  });


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
      bob.work();
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
