'use strict';

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

module.exports = Apartment;
