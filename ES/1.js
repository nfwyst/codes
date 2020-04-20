// iterator generator
let name = function* () {
  yield '冰淇淋'
  yield '汉堡包'
  yield '三明治'
}

const g = name()

for (const iterator of g) {
  console.log(iterator);
}

class Person {
  constructor(age) {
    this.age = age
  }

  tell() {
    console.log(`wang's age is${this.age}`);
  }
}

class Man extends Person {
  constructor(age) {
    super(age)
  }

  tell() {
    super.tell()
    console.log('halo');
  }

  static init() {
    console.log('static')
  }
}

const wang = new Man(30)
console.log(wang.tell())
Man.init()
// Set
let arr = new Set('hello world')
arr.add('what')
arr.add('sc')
console.log(arr.has('sc'))
arr.delete('h')
for (const iterator of arr) {
  console.log(iterator);
}
console.log(arr.size)
// Map
let food = new Map()
let fruit = {}
let cook = function () { }
food.set(fruit, '...')
food.set(cook, 'ok')
console.log(food)
console.log(food.size);
food.delete(cook)
console.log(food.size);

const arr1 = [1, 2, 3, 4, 4]
const result = [...new Set(arr1)]
console.log(result);
