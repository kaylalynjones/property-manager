'use strict';

var collApartment = global.mongodb.collection('apartments');
//var _ = require('lodash');

function Apartment(unit){
  this.unit = unit;
  this.rooms = [];
  this.renters = [];

}

Apartment.prototype.area = function() {
  var combinedArea = 0;
  for (var i = 0; i< this.rooms.length; i++) {
    combinedArea += this.rooms[i].area();
  }
  return combinedArea;
};

Apartment.prototype.cost = function() {
  var cost = 0;
  for (var i = 0; i< this.rooms.length; i++) {
    cost += this.rooms[i].cost();
  }
  return cost;
};

Apartment.prototype.bedrooms = function() {
  var beds = 0;
  for (var i = 0; i< this.rooms.length; i++) {
    if(this.rooms[i].isBedroom){
      beds += 1;
    }
  }
  return beds;
};

Apartment.prototype.isAvailable = function(){
  return this.bedrooms() > this.renters.length;
};

Apartment.prototype.purgeEvicted = function(){
  var notEvicted = [];
  for(var i = 0; i < this.renters.length; i++){
    if(!this.renters[i].isEvicted){
      notEvicted.push(this.renters[i]);
    }
  }
  this.renters = notEvicted;
};

Apartment.prototype.collectRent = function(){
  var total = 0;

  for(var i = 0; i < this.rooms.length; i++){
    total += this.rooms[i].cost();
  }
  total /= this.renters.length;
  for( i = 0; i < this.renters.length; i++){
    this.renters[i].cash -= total;
  }
};

Apartment.prototype.save = function(cb){
  collApartment.save(this, function(err, apartment){
    cb();
  });
};

Apartment.find = function(search, cb){
  collApartment.find(search).toArray(function(err, apartments){
    cb(apartments);
  });
};

Apartment.findById = function(id, cb){
  var query = {_id:id};
  collApartment.findOne(query, function(err, apartment){
    cb(apartment);
  });
};

Apartment.deleteById = function(id, cb){
  var query = {_id:id};
  collApartment.remove(query, function(){
    cb();
  });
};


module.exports = Apartment;
