'use strict';

function Room(name, width, length){
  this.name = name;
  this.width = parseInt(width);
  this.length = parseInt(length);
}

module.exports = Room;
