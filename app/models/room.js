'use strict';

function Room(name, width, length){
  this.name = name;
  this.width = parseInt(width);
  this.length = parseInt(length);
}

Room.prototype.area = function(){
  return this.length * this.width;
};

module.exports = Room;
