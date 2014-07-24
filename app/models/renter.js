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

module.exports = Renter;
