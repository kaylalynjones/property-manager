'use strict';

var apartments = global.mongodb.collection('apartments');
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
  for(var i = 0; i < this.renters.length; i++){
    this.renters[i].cash -= total;
  }
};

Apartment.find = function(query, cb) {
  apartments.find(query, cb);
}

Apartment.findById = function(id) {
  apartments.findOne({ _id: id });
}

module.exports = Apartment;
