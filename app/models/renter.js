'use strict';

function Renter(name, age, gender, profession){
  this.name = name;
  this.age = parseInt(age);
  this.gender = gender;
  this.cash = Math.floor(Math.random()* 4901) + 100;
  this.isEvicted = false;
  this.profession = profession;
}

Renter.prototype.work = function(){
  switch(this.profession){
    case 'movie star':
      this.cash += Math.floor(Math.random() * 7001) + 3000;
      break;
    case 'coder':
      this.cash += Math.floor(Math.random() * 6001) + 1000;
      break;
    case 'waiter':
      this.cash += Math.floor(Math.random() * 201) + 50;
      break;
    case 'social worker':
      this.cash += Math.floor(Math.random() * 601) + 150;
  }
};

Renter.prototype.payRent = function(rent){

  if( this.cash >= rent && this.isEvicted === false ){
    this.cash -= rent;
  } else {
    this.isEvicted = true;
  }
};

Renter.prototype.party = function(){
  if(!this.isEvicted){
    this.isEvicted = (Math.floor(Math.random() * 10) + 1) > 8 ? true : false;
  }
};

module.exports = Renter;
