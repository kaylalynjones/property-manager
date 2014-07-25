'use strict';

var collApartment = global.mongodb.collection('apartments');
var _ = require('lodash');
var Renter = require('./renter');
var Room = require('./room');

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
  if(this.renters.length < 1){return;}
  var rent = this.cost() / this.renters.length;
  for(var i = 0; i < this.renters.length; i++){
    this.renters[i].payRent(rent);
  }
};

Apartment.prototype.save = function(cb){
  collApartment.save(this, function(err, apartment){
    cb();
  });
};

Apartment.find = function(search, cb){
  collApartment.find(search).toArray(function(err, apartments){
    for(var i = 0; i < apartments.length; i++){
      apartments[i] = proto(apartments[i]);
    }
    cb(apartments);
  });
};

Apartment.findById = function(id, cb){
  var query = {_id:id};
  collApartment.findOne(query, function(err, apartment){
    cb(proto(apartment));
  });
};

Apartment.deleteById = function(id, cb){
  var query = {_id:id};
  collApartment.remove(query, function(){
    cb();
  });
};

Apartment.area = function(cb){
  Apartment.find({}, function(apartments){
    var sum = 0;
    for(var i =0; i < apartments.length; i++){
      sum += apartments[i].area();
    }
    cb(sum);
  });
};

Apartment.cost = function(cb){
  Apartment.find({}, function(apartments){
    var sum = 0;
    for(var i =0; i < apartments.length; i++){
      sum += apartments[i].cost();
    }
    cb(sum);
  });
};

Apartment.tenants = function(cb){
  Apartment.find({}, function(apartments){
    var sum = 0;
    for(var i = 0; i < apartments.length; i++){
      sum += apartments[i].renters.length;
    }
    cb(sum);
  });
};

Apartment.revenue = function(cb){
  Apartment.find({}, function(apartments){
    var sum = 0;
    for(var i = 0; i < apartments.length; i++){
      if(apartments[i].renters.length >= 1){
        sum += apartments[i].cost();
      }
    }
    cb(sum);
  });
};



//private functions

function proto(apartment){
  var rooms;
  var renters;

  for(var i = 0; i < apartment.rooms.length; i++){
    rooms = _.create(Room.prototype, apartment.rooms[i]);
    apartment.rooms[i] = rooms;
  }
  for(i = 0; i < apartment.renters.length; i++){
    renters = _.create(Renter.prototype, apartment.renters[i]);
    apartment.renters[i] = renters;
  }

  return _.create(Apartment.prototype, apartment);
}
module.exports = Apartment;
