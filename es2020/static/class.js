// es5 version
let Animal = function (type) {
  this.type = type
}

Animal.prototype.eat = function () {
  console.log('eating...')
}

let Dog = function (...args) {
  Animal.call(this, ...args)
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog
const dog = new Dog('dog')
console.log(dog)

// es6 version
